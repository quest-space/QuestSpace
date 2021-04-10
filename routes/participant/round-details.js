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

let username = 'HassaanAW';
const currTime = Date.now();

// authentication:
// makes sure user is enrolled in quest
// makes sure round exists
// makes sure round is live
router.post(`/:questid/:roundid`, (req, res, next) => {
  if (!req.body.participationData) {
    sendRes(res, FORBIDEN_STATUS_CODE, {
      errors: {},
      genericErrMsg: `You are not enrolled in quest`
    });
  } else {
    const roundData = await Round.find({questName: req.body.questData.questName, roundNum: req.params.roundid}) // find round by roundnum
    req.body.roundData = roundData;
    if (!roundData) {
      sendRes(res, FORBIDEN_STATUS_CODE, {
        errors: {},
        genericErrMsg: `Round doesn't exist`
      });
    } else {
      if (!(Helper.getQuestStatus(roundData.startTime, roundData.endTime, currTime) === "Live")) {
        sendRes(res, FORBIDDEN_STATUS_CODE, {
          errors: {},
          genericErrMsg: `Round isn't live`
        });
      } else {
        next();
      }
    }
  }
});

router.post(`/:questid/:roundid/attempt`, (req, res) => {

  // make sure user is enrolled
  // make sure that round is live

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