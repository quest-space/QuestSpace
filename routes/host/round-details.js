    const { Router } = require (`express`);
    const multer = require(`multer`);
    const Participant = require(`../../models/participant`);
    const Quest = require(`../../models/quest`);
    const Host = require(`../../models/host`);
    const Rating = require(`../../models/ratings`);
    const Participation = require(`../../models/participation`);
    const Round = require(`../../models/rounds`);
    const Submission = require(`../../models/submission`);
    const Question = require(`../../models/questions`);
    const TimeFormatter = require(`../helpers/helperFunctions`);

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
    const { getImgUploadURL } = require(`../helpers/imgUploadHelper`);

    const check_quest_status = (questdata, currTime) =>{
        // Live quest
        if((questdata.startTime.getTime() < currTime) && (currTime < questdata.endTime.getTime() ) ){ 
            return "Live"
        }
        else if((questdata.startTime.getTime() > currTime) ){
            return "Upcoming"
        }
        else if((questdata.startTime.getTime() < currTime) && (currTime > questdata.endTime.getTime() )){
            return "Past"
        }
    }

    const parseQuestions = (questions) => 
    new Promise(async (resolve, reject) => {
    try {
        const formatted_data = questions.map((val, index) => 
        ({  questionNum: val.questionNum,
            questionType: val.questionType,
            statement: val.statement,
            options: val.options,
            answer: val.answer,
            imageURL: val.imageURL
        })
        );
        resolve(formatted_data);
    } 
    catch(err){
        reject(err);
    }
    })



    router.post(`/:questid/:roundid`, async (req, res) => {
        // Collect all round details here + Questions + Leaderbaord + Submission if it is a Submission based round. Add quest logo URL too
        const currTime = Date.now();
        try {
            // gather round details
            const quest_details = await Quest.findOne({_id: req.params.questid})
            const round_details = await Round.findOne({questName: quest_details.questName, roundNum: req.params.roundid}) 

            const status = await check_quest_status(quest_details, currTime);

            const formatted_rounds =  
            {   
                questName: round_details.questName,
                logoURL: quest_details.logoURL,
                roundName: round_details.roundName,
                roundNum: round_details.roundNum,
                roundType: round_details.roundType,
                marks: round_details.eachMarks,
                description: round_details.description,
                startTime: TimeFormatter.formatAMPM(round_details.startTime),
                endTime: TimeFormatter.formatAMPM(round_details.endTime)
            }
            // All round details done here ^
            
            const question_details = await Question.find({questName: quest_details.questName, roundNum: req.params.roundid })
            const formatted_questions = await parseQuestions(question_details)
            // Questions info sent

            const leaderboard = await makeLeaderboard(req.params.questid, req.params.roundid, "host", "");
            // Leaderboard sent 
            
            const to_send = {}

            to_send["status"] = status;
            if(status == "Upcoming"){
                to_send["editable"] = true;
                to_send["submissions"] = null;
            }
            else{
                to_send["editable"] = false;
            }
            if(formatted_rounds.length === 0){
                to_send["rounds"] = null;
            }
            else{
                to_send["rounds"] = formatted_rounds;
            }
            
            if(formatted_questions.length === 0){
                to_send["questions"] = null;
            }
            else{
                to_send["questions"] = formatted_questions;
            }

            if(leaderboard.full.length === 0){
                to_send["leaderboard"] = null;
            }
            else{
                to_send["leaderboard"] = leaderboard;
            }

            // submission data only if round == submission and not upcoming. If Upcoming, send null
            if(round_details.roundType === "Submission"){

                if(status == "Upcoming"){
                    to_send["submissions"] = null;
                }
                else{
                    const student_submission = await Submission.find({questName: quest_details.questName, roundNum: req.params.roundid }).sort( { participantUser: 1 } ); 

                    const participant_info = await Promise.all(student_submission.map(({ participantUser }) => 
                    Participant.find({ username: participantUser}).exec()
                    ));
              

                    const formatted_submission = student_submission.map( (val, index) =>    
                    ({
                            username: val.participantUser,
                            fullname: participant_info[index][0].firstname + ' ' + participant_info[index][0].lastname,
                            filename: val.fileName,
                            fileURL: val.fileURL,
                            questName: val.questName,
                            roundNum: val.roundNum,
                            score: val.roundScore
                    })
                    )
                    if(formatted_submission.length == 0){
                        to_send["submissions"] = null;
                    }
                    else{
                        to_send["submissions"] = formatted_submission;
                    }
                }              
            }

            sendRes(res, OK_STATUS_CODE, to_send);
            
        } catch (err){
            sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err));
        }
            
    });

    const upload = multer({ dest: __dirname + `../../../../qs-uploaded-images/` });
    router.post(`/:questid/:roundid/addquestion`, upload.single(`uploadedImage`), async (req, res) => {
        try{
            const quest_detail = await Quest.findOne({_id: req.params.questid});
            const round_detail = await Round.findOne({questName: quest_detail.questName, roundNum: req.params.roundid});
            const question_number = round_detail.numQuestions;
            
            if (req.file) {
                const question = await Question.updateOne({questName: quest_detail.questName, roundNum: req.params.roundid, questionNum: question_number + 1},
                    {$set: {questName: quest_detail.questName, roundNum: req.params.roundid, roundName: req.body.roundName, questionNum: question_number + 1, 
                    questionType: req.body.questionType, statement: req.body.statement, options: JSON.parse(req.body.options), answer: req.body.answer, imageURL: `${getImgUploadURL()}${req.file.filename}` }},
                    {upsert: true, runValidators: true});
            } else {
                const question = await Question.updateOne({questName: quest_detail.questName, roundNum: req.params.roundid, questionNum: question_number + 1},
                    {$set: {questName: quest_detail.questName, roundNum: req.params.roundid, roundName: req.body.roundName, questionNum: question_number + 1, 
                    questionType: req.body.questionType, statement: req.body.statement, options: JSON.parse(req.body.options), answer: req.body.answer, imageURL: "" }},
                    {upsert: true, runValidators: true});
            }
            const send_question_details = await Question.find({questName: quest_detail.questName, roundNum: req.params.roundid })
            const send_formatted_questions = await parseQuestions(send_question_details)
            const send_back = {}
            send_back["questions"] = send_formatted_questions;
            
            sendRes(res, OK_STATUS_CODE, send_back);
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

    router.post(`/:questid/:roundid/grade`, async (req, res) => {
        try{
             /*
            Update in the Submission Collection
            Need questname, roundnum, participantUser and Score
            Structure:
            [{},{},{}]
            */

            const quest_detail = await Quest.findOne({_id: req.params.questid});
            const quest_name = quest_detail.questName;
        
            const marksheet = req.body.marks;

            marksheet.map( async (val, index) => {
                const each = await Submission.updateOne({questName: quest_name, roundNum: req.params.roundid, participantUser: val.username},{$set: {roundScore: val.score}}) 
            });

            const new_leaderboard = await makeLeaderboard(req.params.questid, req.params.roundid, "host", "");
            
            const send_leaderboard = {}
            send_leaderboard["leaderboard"] = new_leaderboard
            
            sendRes(res, OK_STATUS_CODE, send_leaderboard);
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

            const send_question_details = await Question.find({questName: quest_detail.questName, roundNum: req.params.roundid })
            const send_formatted_questions = await parseQuestions(send_question_details)
            const send_back = {}
            send_back["questions"] = send_formatted_questions;

            sendRes(res, OK_STATUS_CODE, send_back);
        
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
