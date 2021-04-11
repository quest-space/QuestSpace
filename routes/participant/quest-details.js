const { Router } = require (`express`);
const Participant = require(`../../models/participant`);
const Quest = require(`../../models/quest`);
const Host = require(`../../models/host`);
const Rating = require(`../../models/ratings`);
const Participation = require(`../../models/participation`);
const Round = require(`../../models/rounds`);
const TimeFormatter = require(`../helpers/helperFunctions`);

const router = Router();

// global variables
const BAQ_REQUEST_STATUS_CODE = 400;
const CREATED_STATUS_CODE = 201;
const OK_STATUS_CODE = 200;
const DEFAULT_RATING = 3;

const { handleErrorsFromDB } = require(`../helpers/helperFunctions`);
const { sendRes } = require(`../helpers/sendRes`);

router.use(`/enroll`, require(`./participant-enroll`));
router.use(`/`, require(`./round-details`));

let username = 'HassaanAW';
const currTime = Date.now();

/* Idea: Check public or private
If private, user is already enrolled. 
If public, either user is enrolled or not enrolled.  

Check if live, past, or upcoming. 
If live or upcoming, send round info as well. 
Else, only send details. 
*/

// Function to check status of quest (live, past, upcoming)
const check_quest_status = (questdata, currTime) =>{
    // Live quest
    if((questdata[0].startTime.getTime() < currTime) && (currTime < questdata[0].endTime.getTime() ) ){ 
        return "Live"
    }
    else if((questdata[0].startTime.getTime() > currTime) ){
        return "Upcoming"
    }
    else if((questdata[0].startTime.getTime() < currTime) && (currTime > questdata[0].endTime.getTime() )){
        return "Past"
    }
}

router.get(`/:questid`, async (req, res) => {
    try{
    const find_quest = await Quest.find({ _id: req.params.questid}); // find quest by quest_id

    let Enrolled = 1
    if(find_quest[0].nature == "public"){
        // Check if enrolled or not
        const result = await Participation.find({"questName":find_quest[0].questName, "participantUser": req.body.username});
        if(result.length === 1){
            Enrolled = 1
        }
        else{
            Enrolled = 0
        }
    }
    // Private is already enrolled.
    const hostDatasForQuest = await Host.find({ username: find_quest[0].hostUser }) // Get data for Host
    const organization = hostDatasForQuest[0].organization // Organization obtained
    
    const rating = await Rating.aggregate(
        [
            { $match: { hostUser: find_quest[0].hostUser} },
            {  
                $group: {
                    _id: '$hostUser',
                    score: { $avg: '$score' }
                }
            }
        ]
    ) 

    let rate = 0;
    if(rating.length === 0){ 
        rate = DEFAULT_RATING;
    }
    else if(rating.length === 1){
        rate = rating[0].score;
    }
    
    // Collecting data to send

    // enrolled == 1 means enrolled in quest
    // enrolled == 0 means not enrolled
    const quest_details = {
        questID: find_quest[0]._id,
        questName: find_quest[0].questName,
        description: find_quest[0].description,
        startTime: TimeFormatter.formatAMPM(find_quest[0].startTime),
        endTime: TimeFormatter.formatAMPM(find_quest[0].endTime),
        organization: organization,
        enrolled: Enrolled,
        rating: rate
      }
    const to_send = {}

      if(check_quest_status(find_quest, currTime) == "Upcoming"){ 
          // Only send quest details
          to_send["status"] = "quest_details";
          to_send["quest"] = quest_details;
        sendRes(res, OK_STATUS_CODE, to_send);
        return;
      }
      else if( (check_quest_status(find_quest, currTime) == "Live") || (check_quest_status(find_quest, currTime) == "Past") ){
        
        // Send Round Details as well 
        const RoundData = await Round.find({"questName": find_quest[0].questName}).exec();

        const rounds = RoundData.map((val) =>{
            try{

                const details = {
                    questName: val.questName,
                    roundName: val.roundName,
                    roundNum: val.roundNum,
                    roundType: val.roundType,
                    description: val.description,
                    startTime: TimeFormatter.formatAMPM(val.startTime),
                    endTime: TimeFormatter.formatAMPM(val.endTime)
                }
                if(val.roundType === "Rapid Fire"){
                    details["timer"] = val.timer,
                    details["eachMarks"] = val.eachMarks
                }
                else if(val.roundType === "Quiz"){
                    details["eachMarks"] = val.eachMarks
                }
                else if(val.roundType === "Submission"){
                    details["totalMarks"] = val.totalMarks,
                    details["Image"] = val.Image,
                    details["Code"] = val.Code
                }
                const status = check_quest_status([val], currTime)
                    details["status"] = status; // status of round
                return details;
            }
            catch (err){
                console.log(err)
            }   
        })
        
        to_send["status"] = "quest_and_round_details"; // status of quest
        to_send["quest"] = quest_details; // details of quest
        to_send["rounds"] = rounds; // details of round
        sendRes(res, OK_STATUS_CODE, to_send);
        return;
      }

    }
    catch (err){
        console.log(err);
        sendRes(res, BAQ_REQUEST_STATUS_CODE, err);
    }
    
});

module.exports = router;