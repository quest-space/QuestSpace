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
const Question = require(`../../models/questions`);

const router = Router();

// global variables
const BAQ_REQUEST_STATUS_CODE = 400;
const CREATED_STATUS_CODE = 201;
const OK_STATUS_CODE = 200;
const DEFAULT_RATING = 3;

const { handleErrorsFromDB, getConciseDate, check_Round_Validity} = require(`../helpers/helperFunctions`);
const { sendRes } = require(`../helpers/sendRes`);



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

// Add participant
router.post(`/:questid/addparticipant`, async (req, res) => {
    try{
        // Get participant name from body
        // Check if participant exists in Participant Collection -> only then add to quest. QuestName needed to add
        const participant = await Participant.findOne({username: req.body.participant_username})
        if(participant === null){
            const error_msg = {
                error: "Participant not found"
            }
            sendRes(res, BAQ_REQUEST_STATUS_CODE, error_msg);
        }
        else{
            // Participant exists
            const quest_detail = await Quest.findOne({_id: req.params.questid})
            const added = await Participation.updateOne({questName: quest_detail.questName, participantUser: participant.username}, 
                {$set: {questName: quest_detail.questName, participantUser: req.body.participant_username}},
                {upsert: true, runValidators: true})
            sendRes(res, OK_STATUS_CODE, added);
        }
       
    }
    catch(err)
    {
        console.log(err)
        sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err) );
    }
});

//
router.post(`/:questid/removeparticipant`, async (req, res) => {
    try{
        // Get participant name from body
        // Check if participant exists in Participant Collection -> only then add to quest. QuestName needed to add
        const participant = await Participant.findOne({username: req.body.participant_username});
        if(participant === null){
            const error_msg = {
                error: "Participant not found"
            }
            sendRes(res, BAQ_REQUEST_STATUS_CODE, error_msg);
        }
        else{
            // Participant exists
            // Check if participant is already enrolled
            const quest_detail = await Quest.findOne({_id: req.params.questid});

            const is_enrolled = await Participation.findOne({questName: quest_detail.questName, participantUser: participant.username});
            if(is_enrolled === null){
                const error_msg = {
                    error: "Participant is not enrolled"
                }
                sendRes(res, BAQ_REQUEST_STATUS_CODE, error_msg);
            }
            else{
                // participant is enrolled. Now remove
                const removed = await Participation.deleteOne({questName: quest_detail.questName, participantUser: req.body.participant_username});
                sendRes(res, OK_STATUS_CODE, removed);
            }
        }
       
    }
    catch(err)
    {
        console.log(err)
        sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err) );
    }
});


// Add a round
router.post(`/:questid/addround`, async (req, res) => {
    try{
        const quest_detail = await Quest.findOne({_id: req.params.questid})
        const numrounds = quest_detail.numRounds

        const check = check_Round_Validity(quest_detail.startTime.getTime(), quest_detail.endTime.getTime(), Date.parse(req.body.startTime), Date.parse(req.body.endTime))
        if(check == "valid"){
            const round = await Round.updateOne({questName: quest_detail.questName, roundNum: numrounds + 1}, {$set: {  roundName: req.body.roundName,  
                roundNum: numrounds+1, roundType: req.body.roundType, description: req.body.description, 
                startTime: req.body.startTime, endTime: req.body.endTime, timer: req.body.timer, eachMarks: req.body.eachMarks, totalMarks: req.body.totalMarks}},
                {upsert: true, runValidators: true})
            sendRes(res, OK_STATUS_CODE, round);
            // Update numRound in quest         
            const quest_update = await Quest.updateOne({_id: req.params.questid}, {$set: {numRounds: numrounds + 1}})
            // auto increment round number completed here
        }
        else if(check == "beforeQuest"){
            sendRes(res, BAQ_REQUEST_STATUS_CODE, {"error": "Round must start after Quest begins"} );
        }
        else if(check == "startafterQuest"){
            sendRes(res, BAQ_REQUEST_STATUS_CODE, {"error": "Round must begin before Quest ends"} );
        }
        else if(check == "future"){
            sendRes(res, BAQ_REQUEST_STATUS_CODE, {"error": "Start time should be earlier than End time"} );
        }
        else if(check == "endafterQuest"){
            sendRes(res, BAQ_REQUEST_STATUS_CODE, {"error": "Round must end before Quest ends"} );
        }
    }
    catch(err)
    {
        console.log(err)
        sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err) );
    }
});

// Delete a round
router.post(`/:questid/:roundid/deleteround`, async (req, res) => {
    try{
        const quest_detail = await Quest.findOne({_id: req.params.questid})
        const numrounds = quest_detail.numRounds
               
        const round_delete = await Round.deleteOne({questName: quest_detail.questName, roundNum: req.params.roundid})
        const question = await Question.deleteMany({questName: quest_detail.questName, roundNum: req.params.roundid})
        
        // Updation begins here
        if(req.params.roundid < numrounds){
            // logic of updating all subsequent round
            const i = parseInt(req.params.roundid)+1;
            var j;
            for(j= i; j <= numrounds; j++){
                var round_update = await Round.updateOne({questName: quest_detail.questName, roundNum: j}, {$set: {roundNum: j-1 } });
                var question_update = await Question.updateMany({questName: quest_detail.questName, roundNum: j},{$set: {roundNum: j-1 } });
            }
            // Subsequent rounds and their questions updated. 
        }
        sendRes(res, OK_STATUS_CODE, round_delete);
       
        // Update numRound in quest         
        const quest_update = await Quest.updateOne({_id: req.params.questid}, {$set: {numRounds: numrounds - 1}})
        // auto decrement roundNum completed here
    }
    catch(err)
    {
        console.log(err)
        sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err) );
    }
});

router.post(`/:questid`, async (req, res) => {
    const currTime = Date.now();
    try{
    const find_quest = await Quest.find({ _id: req.params.questid}); // find quest by quest_id

    const hostDatasForQuest = await Host.find({ username: find_quest[0].hostUser }) // Get data for Host
    const organization = hostDatasForQuest[0].organization // Organization obtained
    const rating = hostDatasForQuest[0].rating
    
    // Collecting data to send
    const quest_details = {
        questID: find_quest[0]._id,
        questName: find_quest[0].questName,
        hostUser:  hostDatasForQuest[0].username,
        description: find_quest[0].description,
        about: find_quest[0].about,
        startTime: TimeFormatter.formatAMPM(find_quest[0].startTime),
        startTimeRaw: find_quest[0].startTime,
        endTime: TimeFormatter.formatAMPM(find_quest[0].endTime),
        endTimeRaw: find_quest[0].endTime,
        organization: organization,
        status: check_quest_status(find_quest, currTime),
        rating: rating,
        nature: find_quest[0].nature,
        logoURL: find_quest[0].logoURL
      }
    const to_send = {}

    const participants = await Participation.find({ questName:find_quest[0].questName});
    const formatted_participants = await parseParticipants(participants);

    const round_details = await Round.find({questName:find_quest[0].questName});
    const formatted_rounds = await parseRounds(round_details);   

      if(check_quest_status(find_quest, currTime) == "Upcoming"){ 
        // Only send quest details
        to_send["status"] = "Upcoming"; // will determine which tabs to show
        to_send["editable"] = true;
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
        
        const ret_val = await makeLeaderboard(req.params.questid, 0, "host", "");
      
        to_send["status"] = check_quest_status(find_quest, currTime); // status of quest
        to_send["editable"] = false;
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

router.use(`/`, require(`./round-details`));

module.exports = router;