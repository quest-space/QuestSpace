const { Router } = require (`express`);
const router = Router();

// models
const Quest = require(`../../models/quest`);
const Participation = require(`../../models/participation`);

// helper funcs
const { getQuestStatus } = require("../helpers/helperFunctions");
const { sendRes } = require("../helpers/sendRes");

// status codes
const BAQ_REQUEST_STATUS_CODE = 400;
const UNAUTHORIZED_STATUS_CODE = 401;

// filters authorized users
router.use(`/:questid`, async (req, res, next) => {
  
  // nature: private -> requestor must be enrolled
  // nature: public -> requestor must be enrolled if it is a live or past quest

  console.log(`dfsdf`);

  try {
    const questData = await Quest.findOne({ _id: req.params.questid }).exec();
    req.body.questData = questData;
    if (questData) {  
      
      const hasParticipated = await Participation.findOne({ participantUser: req.body.username, questName: questData.questName }).exec();
      req.body.participationData = hasParticipated;
      let auth = false;
      if (questData.nature === `private`) {
        if (hasParticipated) {
          auth = true;
          // next();
        }
      } else if (questData.nature === `public`) {
        const questStatus = getQuestStatus(questData.startTime, questData.endTime, Date.now());
        if (questStatus === `Live` || questStatus === `Past`) {
          if (hasParticipated) {
            auth = true;
            // next();
          }
        } else {
          auth = true;
          // next();
        }
      }

      if (auth) {
        next();
        return;
      } else {
        sendRes(res, UNAUTHORIZED_STATUS_CODE, {
          errors: {},
          genericErrMsg: `No authorization for this resource`
        });
      }

    } else {
      sendRes(res, BAQ_REQUEST_STATUS_CODE, {
        errors: {},
        genericErrMsg: `Quest not found.`
      });
    }
  } catch (err) {
    console.log(err);
    sendRes(res, BAQ_REQUEST_STATUS_CODE, {
      errors: {},
      genericErrMsg: `Quest not found.`
    });
  }

});

module.exports = router;