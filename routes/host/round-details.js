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
const { findOne } = require("../../models/participant");
const { makeLeaderboard } = require(`../helpers/leaderboard_helper`);


// router.use(`/addquestion`, require(`./addquestion`))
// router.use(`/deletequestion`, require(`./deletequestion`));

router.post(`/:questid/:roundid`, async (req, res) => {
    // Collect all round details here + Questions + Leaderbaord + Submission if it is a Submission based round
      
      try {
          console.log("here")
          const progress = {
            error: "In progress"
        }
          sendRes(res, OK_STATUS_CODE, progress);
        
      } catch (err){
        sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err));
      }
        
});

router.post(`/:questid/:roundid/addquestion`, async (req, res) => {
    try{
        const quest_detail = await Quest.findOne({_id: req.params.questid});
        const round_detail = await Round.findOne({questName: quest_detail.questName, roundNum: req.params.roundid});
        const question_number = round_detail.numQuestions;
        
        const question = await Question.updateOne({questName: quest_detail.questName, roundNum: req.params.roundid, questionNum: question_number + 1},
             {$set: {questName: quest_detail.questName, roundNum: req.params.roundid, roundName: req.body.roundName, questionNum: question_number + 1, 
            questionType: req.body.questionType, statement: req.body.statement, options: req.body.options, answer: req.body.answer}},
            {upsert: true})
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

router.post(`/:questid/:roundid/setEach`, async (req, res) => {
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

router.post(`/:questid/:roundid/:questionid/deletequestion`, async (req, res) => {
    try{
        const quest_detail = await Quest.findOne({_id: req.params.questid})
        const round_detail = await Round.findOne({questName: quest_detail.questName, roundNum: req.params.roundid});
        const question_number = round_detail.numQuestions;
              
        // Delete particular question
        const question_delete = await Question.deleteOne({questName: quest_detail.questName, roundNum: req.params.roundid, questionNum: req.params.questionid})
                
        // Updation begins here
        if(req.params.questionid < question_number){
            // logic of updating all subsequent questions
            const i = parseInt(req.params.questionid)+1;
            var j;
            for(j= i; j <= question_number; j++){
                var question_update = await Question.updateMany({questName: quest_detail.questName, roundNum: req.params.roundid, questionNum: j},{$set: {questionNum: j-1 } });
            }
            // Subsequent rounds and their questions updated. 
        }
        sendRes(res, OK_STATUS_CODE, question_delete);
       
        // Update numQuestion in round        
        const update_questionNum = await Round.updateOne({questName: quest_detail.questName, roundNum: req.params.roundid}, {$set: {numQuestions: question_number - 1}})
        // auto decrement QuestionNum completed here
    }
    catch(err)
    {
        console.log(err)
        sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err) );
    }
});

module.exports = router;
//http://localhost:4333/api/participant/quest/606f52fae0819e31a0746ee4/1