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

router.post(`/:questid/:roundid/:questionid`, async (req, res) => {
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
