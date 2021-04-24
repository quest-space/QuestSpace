const { Router } = require (`express`);
const Participant = require(`../../models/participant`);
const Quest = require(`../../models/quest`);
const Host = require(`../../models/host`);
const Rating = require(`../../models/ratings`);
const Participation = require(`../../models/participation`);
const Round = require(`../../models/rounds`);
const Submission = require(`../../models/submission`);

const router = Router();

// global variables
const FORBIDDEN_STATUS_CODE = 403;
const BAQ_REQUEST_STATUS_CODE = 400;
const OK_STATUS_CODE = 200;

const { handleErrorsFromDB } = require(`../helpers/helperFunctions`);
const { sendRes } = require(`../helpers/sendRes`);
const Helper = require(`../helpers/helperFunctions`);

const currTime = Date.now();

router.post(`/:questid`, async (req, res) => {
    try{
        const quest_detail = await Quest.findOne({_id: req.params.questid})
        const numrounds = quest_detail.numRounds
        
        const round = await Round.updateOne({questName: quest_detail.questName, roundNum: numrounds + 1}, {$set: {  roundName: req.body.roundName,  
            roundNum: numrounds+1, roundType: req.body.roundType, description: req.body.description, 
            startTime: req.body.startTime, endTime: req.body.endTime, timer: req.body.timer, eachMarks: req.body.eachMarks, totalMarks: req.body.totalMarks}},
            {upsert: true, runValidators: true})
        sendRes(res, OK_STATUS_CODE, round);
        // Update numRound in quest         
        const quest_update = await Quest.updateOne({_id: req.params.questid}, {$set: {numRounds: numrounds + 1}})
        // auto increment round number completed here
    }
    catch(err)
    {
        console.log(err)
        sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err) );
    }
});
module.exports = router;
