const Quest = require(`../../models/quest`);
const multer = require(`multer`);

const { handleErrorsFromDB, getQuestStatus } = require(`../helpers/helperFunctions`);
const { sendRes } = require(`../helpers/sendRes`);
const { getImgUploadURL } = require(`../helpers/imgUploadHelper`);
const { request } = require("express");

// global variables
const FORBIDDEN_STATUS_CODE = 403;
const BAQ_REQUEST_STATUS_CODE = 400;
const OK_STATUS_CODE = 200;

const uploadCreateLogo = multer({ dest: __dirname + `../../../../qs-uploaded-images/` });
router.post(`/`, uploadCreateLogo.single(`logo`), async (req, res) => {
    // console.log(req.body);
    if (!req.file) {
        sendRes(res, BAQ_REQUEST_STATUS_CODE, {
            errors: {
                logo: {
                    message: `Logo not provided`
                }
            }
        });
        return;
    }
    try {
        // update a quest. If it does not exit, create a new one.
        const newQuest = await Quest.create({
            questName: req.body.questName,
            hostUser: req.username,
            nature: req.body.nature,
            description: req.body.description,
            about: req.body.about,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            logoURL: `${getImgUploadURL()}${req.file.filename}`,
            status: "pending",
            numRounds: 0
        });
        sendRes(res, OK_STATUS_CODE, newQuest);
    }
    catch(err){
        // console.log(err);
        sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err) );
    }
  });

const uploadUpdateLogo = multer({ dest: __dirname + `../../../../qs-uploaded-images/` });
router.post(`/create`, uploadUpdateLogo.single(`logo`), async (req, res) => {
    console.log(req.body);
    try {
        // update a quest. If it does not exit, create a new one.
        findOne(questName)
        if (req.file) {
            const newQuest = await Quest.updateOne(
                { questName: req.body.questName },
                {$set: {
                    nature: req.body.nature,
                    description: req.body.description,
                    about: req.body.about,
                    startTime: req.body.startTime,
                    endTime: req.body.endTime,
                    logoURL: `${getImgUploadURL()}${req.file.filename}`,
                    status: "pending",
                    numRounds: 0
                }},
                { runValidators: true }
            );
        } else {
            
        }
        
        sendRes(res, OK_STATUS_CODE, newQuest);
    }
    catch(err){
        console.log(err);
        sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err) );
    }
});
  

/*
onst quest = await Quest.updateOne({questName:req.body.questName}, {$set: { logoURL: `${getImgUploadURL()}${req.file.filename}`, hostUser: req.username,  
            nature: req.body.nature, description: req.body.description, about: req.body.about, 
            startTime: req.body.startTime, endTime: req.body.endTime, status: "pending"}}, {upsert: true, runValidators: true})
*/

module.exports = router;


