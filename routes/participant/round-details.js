const { Router } = require (`express`);
const multer = require('multer');
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
const CREATED_STATUS_CODE = 201;

const { handleErrorsFromDB } = require(`../helpers/helperFunctions`);
const { getFileUploadURL } = require(`../helpers/imgUploadHelper`)
const { sendRes } = require(`../helpers/sendRes`);
const Helper = require(`../helpers/helperFunctions`);
const { findOne } = require("../../models/participant");
const { attemptRound } = require(`./attemptRound`);
const { makeLeaderboard } = require(`../helpers/leaderboard_helper`);

let username = 'HassaanAW';
const currTime = Date.now();

// authentication:
router.use(`/:questid/:roundid`, async (req, res, next) => {
  // console.log(`came here`);
  // console.log({participationData: req.body.participationData});
  // console.log({questData: req.body.questData});
  if (!req.body.participationData) {
    sendRes(res, FORBIDEN_STATUS_CODE, {
      errors: {},
      genericErrMsg: `You are not enrolled in quest`
    });
  } else {
    const roundData = await Round.findOne({questName: req.body.questData.questName, roundNum: req.params.roundid}) // find round by roundnum
    req.body.roundData = roundData;
    // console.log(`roundData:`);
    // console.log(req.body.roundData);
    // console.log({roundData});
    if (!roundData) {
      sendRes(res, FORBIDEN_STATUS_CODE, {
        errors: {},
        genericErrMsg: `Round doesn't exist`
      });
    } else {
      const roundStatus = Helper.getQuestStatus(roundData.startTime, roundData.endTime, currTime);
      if (roundStatus === `Upcoming`) {
        sendRes(res, FORBIDDEN_STATUS_CODE, {
          errors: {},
          genericErrMsg: `Round hasn't started yet`
        });
      } else {
        next();
        return;
      }
    }
  }
});
// makes sure user is enrolled in quest
// makes sure round exists
// makes sure round is live

router.post(`/:questid/:roundid/leaderboard`, async (req, res) => {
  
  try{
        const ret_val = await makeLeaderboard(req.params.questid, req.params.roundid, "participant", req.body.username);
        sendRes(res, OK_STATUS_CODE, ret_val );
    }
    catch(err){
        sendRes(res, BAQ_REQUEST_STATUS_CODE, err );
    }
  
});

const upload = multer({ dest: __dirname + `../../../../qs-uploaded-files/` });
router.post(`/:questid/:roundid/submit`, upload.single(`submittedFile`), async (req, res) => {
  if (!req.file) {
    sendRes(res, BAQ_REQUEST_STATUS_CODE, {
      error: `File not given`
    });
    return;
  }
  const questData = await Quest.findOne({ _id: req.params.questid })
  const roundData = await Round.findOne({questName: questData.questName, roundNum: req.params.roundid })
  try {
    await Submission.create({
      questName: questData.questName,
      roundNum: roundData.roundNum,
      participantUser: req.username,
      fileURL: `${getFileUploadURL()}${req.file.filename}`,
      fileName: req.file.originalname,
      beginTime: new Date(Date.now()),
      expireTime: roundData.endTime,
      isAttemptFinished: true
    })
    sendRes(res, CREATED_STATUS_CODE, {
      status: `submitted successfully`
    })
  } catch (err) {
    console.log(`shit`, err);
    sendRes(res, BAQ_REQUEST_STATUS_CODE, {
      error: err
    });
  }
});

router.post(`/:questid/:roundid/attempt`, async (req, res) => {
  attemptRound(req, res);
});

router.post(`/:questid/:roundid`, async (req, res) => {
  
  try {
    
    const find_quest = await Quest.find({ _id: req.params.questid}); // find quest by questid
    const find_round = await Round.find({questName: find_quest[0].questName, roundNum: req.params.roundid}); // find round by roundnum
    const SubmissionData = await Submission.findOne({questName: find_quest[0].questName, roundNum: req.params.roundid,  participantUser: req.body.username});
    const isAttemptFinished = SubmissionData ? SubmissionData.isAttemptFinished : false;
    
    

    if (Helper.getQuestStatus(find_round[0].startTime, find_round[0].endTime, currTime) === "Live") {
        
      const find_round = await Round.find({questName: find_quest[0].questName, roundNum: req.params.roundid})
      const round_details = {
          startTime: Helper.formatAMPM(find_round[0].startTime),
          startTimeRaw: find_round[0].startTime,
          endTime: Helper.formatAMPM(find_round[0].endTime),
          endTimeRaw: find_round[0].endTime,
          timer: find_round[0].timer,
          hostUser: find_quest[0].hostUser,
          description: find_round[0].description,
          roundName: find_round[0].roundName,
          questName: find_round[0].questName,
          isAttemptFinished: isAttemptFinished,
          roundType: find_round[0].roundType,
          logoURL: find_quest[0].logoURL
      }

      const rating = await Rating.findOne({ hostUser: find_quest[0].hostUser, participantUser: req.username });
      if (rating) {
        round_details[`prevRating`] = rating.score;
      }

      sendRes(res, OK_STATUS_CODE, round_details);

    } else {
      sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err));
    }

  } catch (err){
    sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err));
  }
    
});

module.exports = router;
//http://localhost:4333/api/participant/quest/606f52fae0819e31a0746ee4/1