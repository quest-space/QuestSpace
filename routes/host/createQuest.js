const Quest = require(`../../models/quest`);
const multer = require(`multer`);

const { handleErrorsFromDB, checkQuestValidity } = require(`../helpers/helperFunctions`);
const { sendRes } = require(`../helpers/sendRes`);
const { getImgUploadURL } = require(`../helpers/imgUploadHelper`);
const { request } = require("express");
const Round = require("../../models/rounds");

// global variables
const FORBIDDEN_STATUS_CODE = 403;
const BAQ_REQUEST_STATUS_CODE = 400;
const OK_STATUS_CODE = 200;

const handleTimingValidity = (req, res) => {
    if (!req.body.startTime || req.body.startTime === `undefined`) {
        sendRes(res, BAQ_REQUEST_STATUS_CODE, {
            errors: {
                startTime: {
                    message: `Start time is required`,
                    valueReceived: req.body.startTime
                }
            }
        });
        return false;
    }
    if (!req.body.endTime || req.body.endTime === `undefined`) {
        sendRes(res, BAQ_REQUEST_STATUS_CODE, {
            errors: {
                endTime: {
                    message: `End time is required`,
                    valueReceived: req.body.endTime
                }
            }
        });
        return false;
    }
    const validity = checkQuestValidity(Date.now(), Date.parse(req.body.startTime), Date.parse(req.body.endTime));
    if (validity === `valid`) {
        return true;
    } else if (validity === `start>=end`) {
        sendRes(res, BAQ_REQUEST_STATUS_CODE, {
            endTime: {
                message: `End time must be after Start Time`,
                valueReceived: req.body.endTime
            }
        });
        return false;
    } else {
        console.log({validity});
        sendRes(res, BAQ_REQUEST_STATUS_CODE, {
            errors: {
                startTime: {
                    message: `Start Time cannot be a time in the past`,
                    valueReceived: req.body.startTime
                }
            }
        });
        return false;
    }
}

const uploadCreateLogo = multer({ dest: __dirname + `../../../../qs-uploaded-images/` });
router.post(`/create`, uploadCreateLogo.single(`logo`), async (req, res) => {
    console.log(req.body);
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
        if (handleTimingValidity(req, res)) {
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
    }
    catch(err){
        // console.log(err);
        sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err) );
    }
  });

const uploadUpdateLogo = multer({ dest: __dirname + `../../../../qs-uploaded-images/` });
router.post(`/edit`, uploadUpdateLogo.single(`logo`), async (req, res) => {
    console.log(req.body);
    try {
        // update a quest. If it does not exit, create a new one.
        if (handleTimingValidity(req, res)) {

            const rounds = await Round.find({ questName : req.body.questName }).exec();
            
            const startTimeValid = rounds.reduce((acc, currRound) => (
                acc && (currRound.startTime.getTime() >= Date.parse(req.body.startTime))
            ), true);
            if (!startTimeValid) {
                sendRes(res, BAQ_REQUEST_STATUS_CODE, {
                    errors: {
                        startTime: `Quest should start before all of its individual rounds.`
                    }
                });
                return;
            }

            const endTimeValid = rounds.reduce((acc, currRound) => (
                acc && (currRound.endTime.getTime() <= Date.parse(req.body.endTime))
            ), true);
            if (!endTimeValid) {
                sendRes(res, BAQ_REQUEST_STATUS_CODE, {
                    errors: {
                        endTime: `Quest should end after all of its individual rounds have ended.`
                    }
                });
                return;
            }

            if (req.file) {
                const newQuest = await Quest.updateOne(
                    { questName: req.body.questName },
                    { $set: {
                        nature: req.body.nature,
                        description: req.body.description,
                        about: req.body.about,
                        startTime: req.body.startTime,
                        endTime: req.body.endTime,
                        logoURL: `${getImgUploadURL()}${req.file.filename}`
                    }},
                    { runValidators: true }
                );
                sendRes(res, OK_STATUS_CODE, newQuest);
            } else {
                // if file not there
                const newQuest = await Quest.updateOne(
                    { questName: req.body.questName },
                    { $set: {
                        nature: req.body.nature,
                        description: req.body.description,
                        about: req.body.about,
                        startTime: req.body.startTime,
                        endTime: req.body.endTime
                    }},
                    { runValidators: true }
                );
                sendRes(res, OK_STATUS_CODE, newQuest);
            }
        }
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


