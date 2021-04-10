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

  console.log({username: req.body.username});
  try {
    const questData = await Quest.findOne({ _id: req.params.questid }).exec();
    if (questData) {  
      console.log(questData);
      console.log(`----`);
      const hasParticipated = await Participation.findOne({ participantUser: req.body.username, questName: questData.questName }).exec();
      console.log(hasParticipated);
      console.log(`----`);
      let auth = false;
      if (questData.nature === `private`) {
        if (hasParticipated) {
          console.log(1);
          auth = true;
          // next();
        }
      } else if (questData.nature === `public`) {
        const questStatus = getQuestStatus(questData.startTime, questData.endTime, Date.now());
        if (questStatus === `live` || questStatus === `past`) {
          if (hasParticipated) {
            console.log(2);
            auth = true;
            // next();
          }
        } else {
          console.log(3);
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