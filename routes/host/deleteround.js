const { Router } = require (`express`);
const Participant = require(`../../models/participant`);
const Quest = require(`../../models/quest`);
const Host = require(`../../models/host`);
const Rating = require(`../../models/ratings`);
const Participation = require(`../../models/participation`);
const Round = require(`../../models/rounds`);
const Submission = require(`../../models/submission`);
const Question = require(`../../models/questions`);

const router = Router();

// global variables
const FORBIDDEN_STATUS_CODE = 403;
const BAQ_REQUEST_STATUS_CODE = 400;
const OK_STATUS_CODE = 200;

const { handleErrorsFromDB } = require(`../helpers/helperFunctions`);
const { sendRes } = require(`../helpers/sendRes`);
const Helper = require(`../helpers/helperFunctions`);

const currTime = Date.now();

router.post(`/:questid/:roundid`, async (req, res) => {
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
module.exports = router;
