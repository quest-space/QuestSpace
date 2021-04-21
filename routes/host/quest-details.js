const { Router } = require (`express`);
const Participant = require(`../../models/participant`);
const Quest = require(`../../models/quest`);
const Host = require(`../../models/host`);
const Rating = require(`../../models/ratings`);
const Participation = require(`../../models/participation`);
const Round = require(`../../models/rounds`);
const Submission = require(`../../models/submission`);
const TimeFormatter = require(`../helpers/helperFunctions`);
const { makeLeaderboard } = require(`../helpers/leaderboard_helper`);

const router = Router();

// global variables
const BAQ_REQUEST_STATUS_CODE = 400;
const CREATED_STATUS_CODE = 201;
const OK_STATUS_CODE = 200;
const DEFAULT_RATING = 3;

const { handleErrorsFromDB, getConciseDate } = require(`../helpers/helperFunctions`);
const { sendRes } = require(`../helpers/sendRes`);

router.use(`/addround`, require(`./addround`));
router.use(`/deleteround`, require(`./deleteround`));

const currTime = Date.now();

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

const parseParticipants = (participants) => 
  new Promise(async (resolve, reject) => {
    try {
      const participant_data = await Promise.all(participants.map(({ participantUser }) => 
        Participant.find({ username: participantUser}, {firstname: 1, lastname:1}).exec()
      ));
   
      const formatted_data = participants.map(({ participantUser }, i) => 
        ({  username: participantUser,
            name: participant_data[i][0].firstname + ' ' + participant_data[i][0].lastname,
        })
      );
     
      resolve(formatted_data);
    } 
    catch(err){
        reject(err);
    }
  })

const parseRounds = (rounds) => 
new Promise(async (resolve, reject) => {
try {
    const formatted_data = rounds.map((val, index) => 
    ({  questName: val.questName,
        roundName: val.roundName,
        roundNum: val.roundNum,
        roundType: val.roundType,
        startTime: TimeFormatter.formatAMPM(val.startTime),
        endTime: TimeFormatter.formatAMPM(val.endTime)
    })
    );
    resolve(formatted_data);
} 
catch(err){
    reject(err);
}
})

router.post(`/:questid`, async (req, res) => {
    try{
    const find_quest = await Quest.find({ _id: req.params.questid}); // find quest by quest_id

    const hostDatasForQuest = await Host.find({ username: find_quest[0].hostUser }) // Get data for Host
    const organization = hostDatasForQuest[0].organization // Organization obtained
    const rating = hostDatasForQuest[0].rating
    
    // Collecting data to send
    const quest_details = {
        questID: find_quest[0]._id,
        questName: find_quest[0].questName,
        description: find_quest[0].description,
        about: find_quest[0].about,
        startTime: TimeFormatter.formatAMPM(find_quest[0].startTime),
        endTime: TimeFormatter.formatAMPM(find_quest[0].endTime),
        organization: organization,
        status: check_quest_status(find_quest, currTime),
        rating: rating,
        nature: find_quest[0].nature
      }
    const to_send = {}

    const participants = await Participation.find({ questName:find_quest[0].questName});
    const formatted_participants = await parseParticipants(participants);

    const round_details = await Round.find({questName:find_quest[0].questName});
    const formatted_rounds = await parseRounds(round_details);   

      if(check_quest_status(find_quest, currTime) == "Upcoming"){ 
        // Only send quest details
        to_send["status"] = "Upcoming"; // will determine which tabs to show
        to_send["quest"] = quest_details;
        if(formatted_rounds.length === 0){
            to_send["rounds"] = null;
        }
        else{
            to_send["rounds"] = formatted_rounds;
        }
        if(formatted_participants.length === 0){
            to_send["participants"] = null;
        }
        else{
            to_send["participants"] = formatted_participants; 
        }
        to_send["leaderboard"] = null;
        sendRes(res, OK_STATUS_CODE, to_send);
        return;
      }

      else if( (check_quest_status(find_quest, currTime) == "Live") || (check_quest_status(find_quest, currTime) == "Past") ){
        
        // Send Round Details as well 
        // const RoundData = await Round.find({"questName": find_quest[0].questName}).exec();

        // const submissionDatas = await Promise.all(RoundData.map((round) => (
        //     Submission.findOne({questName: find_quest[0].questName, roundNum: round.roundNum,  participantUser: req.body.username}).exec()
        // )));

        // const rounds = RoundData.map((val, i) =>{
        //     try{

        //         const details = {
        //             questName: val.questName,
        //             roundName: val.roundName,
        //             roundNum: val.roundNum,
        //             roundType: val.roundType,
        //             description: val.description,
        //             startTime: TimeFormatter.formatAMPM(val.startTime),
        //             endTime: TimeFormatter.formatAMPM(val.endTime)
        //         }
        //         if(val.roundType === "Rapid Fire"){
        //             details["timer"] = val.timer,
        //             details["eachMarks"] = val.eachMarks
        //         }
        //         else if(val.roundType === "Quiz"){
        //             details["eachMarks"] = val.eachMarks
        //         }
        //         else if(val.roundType === "Submission"){
        //             details["totalMarks"] = val.totalMarks,
        //             details["Image"] = val.Image,
        //             details["Code"] = val.Code
        //         }
        //         const status = check_quest_status([val], currTime)
        //             details["status"] = status; // status of round

        //         if (status === `Live`) {
        //             details[`btnMsg`] = `Attempt`;
        //             details[`btnColor`] = `green`;
        //             details[`isBtnClickable`] = true;
        //             details[`statusMsg1`] = `Live`;
        //             details[`statusMsg2`] = `Ends ${getConciseDate(val.endTime)}`;
        //         }
        //         if (submissionDatas[i] && (submissionDatas[i].isAttemptFinished || submissionDatas[i].expireTime.getTime() < Date.now())) {
        //             details[`btnMsg`] = `Attempted`;
        //             details[`btnColor`] = `grey`;
        //             details[`isBtnClickable`] = false;
        //             details[`statusMsg1`] = `Attempted`;
        //             details[`statusMsg2`] = `Results at ${getConciseDate(val.endTime)}`;
        //         }
        //         if (status === `Past`) {
        //             details[`btnMsg`] = `Leaderboard`;
        //             details[`btnColor`] = `blue`;
        //             details[`isBtnClickable`] = true;
        //             details[`statusMsg1`] = `Finished`;
        //             details[`statusMsg2`] = `Results available`;
        //         }
        //         if (status === `Upcoming`) {
        //             details[`btnMsg`] = `Attempt`;
        //             details[`btnColor`] = `grey`;
        //             details[`isBtnClickable`] = false;
        //             details[`statusMsg1`] = `Not Started`;
        //             details[`statusMsg2`] = `Starts ${getConciseDate(val.startTime)}`;
        //         }

        //         return details;
        //     }
        //     catch (err){
        //         console.log(err)
        //     }   
        // })

        const ret_val = await makeLeaderboard(req.params.questid, 0, "host", "");
      
        to_send["status"] = check_quest_status(find_quest, currTime); // status of quest
        to_send["quest"] = quest_details; // details of quest
        // round data
        if(formatted_rounds.length === 0){
            to_send["rounds"] = null;
        }
        else{
            to_send["rounds"] = formatted_rounds;
        }
        // participant data
        if(formatted_participants.length === 0){
            to_send["participants"] = null;
        }
        else{
            to_send["participants"] = formatted_participants; 
        }

        to_send["leaderboard"] = ret_val; // leaderboard
        if(ret_val.full.length === 0){
            to_send["leaderboard"] = null;
        }
        sendRes(res, OK_STATUS_CODE, to_send);
        return;
      }

    }
    catch (err){
        console.log(err)
        sendRes(res, BAQ_REQUEST_STATUS_CODE, err);
    }
    
});

module.exports = router;