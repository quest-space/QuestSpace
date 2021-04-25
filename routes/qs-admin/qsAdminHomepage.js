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

const parseQuests = (quests, currTime) => 
  new Promise(async (resolve, reject) => {
    try {
      
      const hosts = await (Promise.all(quests.map((quest) => (
        Host.findOne({ username: quest.hostUser }).exec()
      ))));

      const questParticipations = await Promise.all(quests.map(({ questName }) => 
        Participation.find({ questName }).exec()
      ));

      const parsedQuests = quests.map(({ _id, questName, hostUser, nature, about, description, startTime, endTime, logoURL, status, createdAt, timeAcceptedOrRejected }, i) => 
        ({ 
          questID: _id,
          questName,
          hostUser,
          nature,
          description,
          about,
          startTime,
          endTime,
          logoURL,
          questStatus: status,
          status: getQuestStatus(startTime, endTime, currTime),
          organization: hosts[i].organization,
          rating: hosts[i].rating,
          timeRequestWasCreated: createdAt,
          timeAcceptedOrRejected,
          participantCount: questParticipations[i].length
        })
      );

      parsedQuests.forEach((quest, i) => {
        if (quest.questStatus === `pending`) {
          if (quest.status === `Upcoming`) {
            quest[`buttons`] = [
              {
                text: `Accept`,
                color: `green`,
                isClickable: true
              },
              {
                text: `Reject`,
                color: `red`,
                isClickable: true
              }
            ];
          } else {
            quest[`buttons`] = [
              {
                text: `Accept`,
                color: `grey`,
                isClickable: false
              },
              {
                text: `Reject`,
                color: `red`,
                isClickable: true
              }
            ];
          }
        } else if (quest.questStatus === `accepted`) {
          quest[`buttons`] = [
            {
              text: `Accepted`,
              color: `grey`,
              isClickable: false
            }
          ];
        } else {
          quest[`buttons`] = [
            {
              text: `Rejected`,
              color: `grey`,
              isClickable: false
            }
          ];
        }
      });
      
      resolve(parsedQuests);

    } catch (err) {

      reject(err);

    }
  })

router.post(`/`, async (req, res) => {

  try {

    const allQuests = await parseQuests(await Quest.find({}).exec(), Date.now());
    
    const objToReturn = {
      pending: allQuests.filter(quest => quest.questStatus === `pending`),
      accepted: allQuests.filter(quest => quest.questStatus === `accepted`),
      rejected: allQuests.filter(quest => quest.questStatus === `rejected`),
      all: allQuests
    }
    sendRes(res, OK_STATUS_CODE, objToReturn);

  } catch (err) {
    console.log(err);
    sendRes(res, UNPROCESSABLE_ENTRY_STATUS_CODE, {
      error: err.message
    });
  }
})

module.exports = router;