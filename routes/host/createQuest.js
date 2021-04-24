const Quest = require(`../../models/quest`);

const { handleErrorsFromDB, getQuestStatus } = require(`../helpers/helperFunctions`);
const { sendRes } = require(`../helpers/sendRes`);

// global variables
const FORBIDDEN_STATUS_CODE = 403;
const BAQ_REQUEST_STATUS_CODE = 400;
const OK_STATUS_CODE = 200;

router.post(`/`, async (req, res) => {

    try{
        // update a quest. If it does not exit, create a new one.
        const quest = await Quest.updateOne({questName:req.body.questName}, {$set: { hostUser: req.body.username,  
            nature: req.body.nature, description: req.body.description, about: req.body.about, 
            startTime: req.body.startTime, endTime: req.body.endTime }}, {upsert: true, runValidators: true})
        sendRes(res, OK_STATUS_CODE, quest );
    }
    catch(err){
        sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err) );
    }
  });

module.exports = router;


