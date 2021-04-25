const { Router } = require (`express`);
const router = Router();

const Host = require(`../../models/host`);
const Quest = require(`../../models/quest`);
const Participation = require(`../../models/participation`);
const { sendRes } = require(`../helpers/sendRes`);
const { getQuestStatus } = require(`../helpers/helperFunctions`);

const UNPROCESSABLE_ENTRY_STATUS_CODE = 422;
const BAQ_REQUEST_STATUS_CODE = 400;
const CREATED_STATUS_CODE = 201;
const OK_STATUS_CODE = 200;

router.post(`/`, async (req, res) => {

  try {

    if (!req.body.questName) {
      sendRes(res, BAQ_REQUEST_STATUS_CODE, {
        error: "questName not provided"
      });
      return;
    }
    
    const quest = await Quest.findOne({ questName: req.body.questName }).exec();

    if (!quest) {
      sendRes(res, BAQ_REQUEST_STATUS_CODE, {
        error: "Quest does not exist"
      });
      return;
    }

    if (quest.status !== `pending`) {
      sendRes(res, BAQ_REQUEST_STATUS_CODE, {
        error: "You cannot accept an accepted/rejected quest"
      });
      return;
    }

    if (getQuestStatus(quest.startTime, quest.endTime, Date.now()) !== `Upcoming`) {
      sendRes(res, BAQ_REQUEST_STATUS_CODE, {
        error: "You cannot accept a live/past quest"
      });
      return;
    }

    const updateQuest = updateOne({ questName: req.body.questName }, { status: `accepted` });

    sendRes(res, OK_STATUS_CODE, updateQuest);

  } catch (err) {
    console.log(err);
    sendRes(res, UNPROCESSABLE_ENTRY_STATUS_CODE, {
      error: err.message
    });
  }
})

module.exports = router;