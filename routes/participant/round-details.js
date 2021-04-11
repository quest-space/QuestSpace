const { Router } = require (`express`);
const Participant = require(`../../models/participant`);
const Quest = require(`../../models/quest`);
const Host = require(`../../models/host`);
const Rating = require(`../../models/ratings`);
const Participation = require(`../../models/participation`);
const Round = require(`../../models/rounds`);

const router = Router();

// global variables
const FORBIDDEN_STATUS_CODE = 403;
const BAQ_REQUEST_STATUS_CODE = 400;
const OK_STATUS_CODE = 200;

const { handleErrorsFromDB } = require(`../helpers/helperFunctions`);
const { sendRes } = require(`../helpers/sendRes`);
const Helper = require(`../helpers/helperFunctions`);
const { findOne } = require("../../models/participant");
const { attemptRound } = require(`./attemptRound`);

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
      } else if (roundStatus === `Past`) {
        sendRes(res, FORBIDDEN_STATUS_CODE, {
          errors: {},
          genericErrMsg: `Round has expired!`
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



router.post(`/:questid/:roundid/attempt`, async (req, res) => {
  // sendRes(res, OK_STATUS_CODE, {a: "hello"});

  attemptRound(req, res);
  
});

router.post(`/:questid/:roundid`, async (req, res) => {
  
  try {
    
    const find_quest = await Quest.find({ _id: req.params.questid}); // find quest by questid
    const find_round = await Round.find({questName: find_quest[0].questName, roundNum: req.params.roundid}) // find round by roundnum
    
    if (Helper.getQuestStatus(find_round[0].startTime, find_round[0].endTime, currTime) === "Live") {
        
      const find_round = await Round.find({questName: find_quest[0].questName, roundNum: req.params.roundid})

      const round_details = {
          startTime: Helper.formatAMPM(find_round[0].startTime),
          endTime: Helper.formatAMPM(find_round[0].endTime),
          timer: find_round[0].timer,
          description: find_round[0].description
      }

      sendRes(res, OK_STATUS_CODE, round_details);

    } else {

      console.log("Round isn't Live")
      sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err));

    }

  } catch (err){
    sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err));
  }
    
});

module.exports = router;
//http://localhost:4333/api/participant/quest/606f52fae0819e31a0746ee4/1