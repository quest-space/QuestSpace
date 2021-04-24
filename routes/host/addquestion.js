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

router.post(`/setEach/:questid/:roundid`, async (req, res) => {
    try{
        const eachMark = req.body.eachQuestion;
        const quest_detail = await Quest.findOne({_id: req.params.questid});
        const round = await Round.updateOne({questName: quest_detail.questName, roundNum: req.params.roundid}, {$set: {eachMarks: eachMark} })
        sendRes(res, OK_STATUS_CODE, round);
    }
    catch(err)
    {
        console.log(err)
        sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err) );
    }
});

router.post(`/:questid/:roundid`, async (req, res) => {
    try{
        const quest_detail = await Quest.findOne({_id: req.params.questid});
        const round_detail = await Round.findOne({questName: quest_detail.questName, roundNum: req.params.roundid});
        const question_number = round_detail.numQuestions;
        
        const question = await Question.updateOne({questName: quest_detail.questName, roundNum: req.params.roundid, questionNum: question_number + 1},
             {$set: {questName: quest_detail.questName, roundNum: req.params.roundid, roundName: req.body.roundName, questionNum: question_number + 1, 
            questionType: req.body.questionType, statement: req.body.statement, options: req.body.options, answer: req.body.answer}},
            {upsert: true, runValidators: true})
        sendRes(res, OK_STATUS_CODE, question);
        // Update numQuestions in round         
        const round_update = await Round.updateOne({questName: quest_detail.questName, roundNum: req.params.roundid }, {$set: {numQuestions: question_number + 1}})
        // auto increment question number completed here
    }
    catch(err)
    {
        console.log(err)
        sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err) );
    }
});
module.exports = router;
