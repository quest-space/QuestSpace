const { Router } = require (`express`);
const Participant = require(`../../models/participant`);
const Participation = require(`../../models/participation`);
const Quest = require(`../../models/quest`);
const Host = require(`../../models/host`);

const router = Router();
const { sendRes } = require(`../helpers/sendRes`);
const { getValidQuests } = require(`../helpers/authenticateQuestAccess`);

// global variables
const BAQ_REQUEST_STATUS_CODE = 400;
const CREATED_STATUS_CODE = 201;
const OK_STATUS_CODE = 200;

// Session cookies will already be stored. Fetch username from there.

const groupArr = (arr, grpLen=4) => {
  const arrToReturn = [];
  for (let i = 0; i < arr.length; i += grpLen) {
    arrToReturn.push(arr.slice(i, i + grpLen));
  }
  return arrToReturn;
}

const parseQuest = (quests) => 
  new Promise(async (resolve, reject) => {
    try {
      const hostInfo = await Promise.all(quests.map(({ hostUser }) => 
      Host.find({ username: hostUser}).exec()
      ));

      const questParticipations = await Promise.all(quests.map(({ questName }) => 
        Participation.find({ questName }).exec()
      ));

      const questData = quests.map((key, i) => ({
        questID: key._id,
        questName: key.questName,
        hostUser: key.hostUser,
        nature: key.nature,
        description: key.description,
        startTime: key.startTime,
        endTime: key.endTime,
        startDate: key.startTime.toDateString(),
        endDate: key.endTime.toDateString(),
        status: key.status,
        participantCount: key.participantCount,
        organization: hostInfo[i][0].organization,
        rating: hostInfo[i][0].rating,
        participantCount: questParticipations[i].length
      }));

      resolve(questData);
    } 
    catch(err){
      reject(err);
    }
  });

router.post(`/`, async (req, res) => {
  try{
    const quests = await Quest.find({}).exec();
    const validQuests = await parseQuest(await getValidQuests(req.body.userType, req.body.username, quests, Date.now()));
    const sorted = validQuests.sort((qA, qB) => qB.participantCount - qA.participantCount).slice(0, 4);
    sendRes(res, OK_STATUS_CODE, {
      quests: groupArr(sorted)
    });
  }
  catch(err)
  {
    sendRes(res, BAQ_REQUEST_STATUS_CODE, err);
  }
});

module.exports = router;