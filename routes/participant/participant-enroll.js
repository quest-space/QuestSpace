const { Router } = require (`express`);
const Quest = require(`../../models/quest`);
const Participation = require(`../../models/participation`);

const router = Router();

// global variables
const BAQ_REQUEST_STATUS_CODE = 400;
const CREATED_STATUS_CODE = 201;
const OK_STATUS_CODE = 200;

const err_response = {
    status: "400",
    message: "Already Enrolled"
}

const { handleErrorsFromDB } = require(`../helpers/helperFunctions`);
const { sendRes } = require(`../helpers/sendRes`);

router.post(`/:questid`, async (req, res) => {
    try{
        console.log(req.params.questid)
        const questData = await Quest.findOne({_id: req.params.questid}); 
        console.log(questData)
        const is_enrolled = await Participation.findOne({participantUser: req.body.username, questName: questData.questName})
        
        if (is_enrolled === null){
            // Participant is not enrolled before so a valid request
            const create_enrollment = await Participation.create({participantUser: req.body.username, questName: questData.questName});
            // console.log("Created")
            sendRes(res, CREATED_STATUS_CODE, create_enrollment);
        }
        else{
            // console.log("You are already enrolled")
            sendRes(res, BAQ_REQUEST_STATUS_CODE, err_response);
        }
    }
    catch(err){
        // console.log("Some other error")
        sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err));
    }
    
});

module.exports = router;