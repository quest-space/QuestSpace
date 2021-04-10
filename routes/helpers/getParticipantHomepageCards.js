const Participant = require(`../../models/participant`);
const Quest = require(`../../models/quest`);
const Host = require(`../../models/host`);
const Rating = require(`../../models/ratings`);
const Participation = require(`../../models/participation`);

const { handleErrorsFromDB, getQuestStatus } = require(`./helperFunctions`);

const sortQuestsByProximity = (quests, currTime, key, order) =>
  quests.sort((questA, questB) => {
    if (key === `startTime`) {
      return order === `asc` ? Math.abs(questA.startTime.getTime() - currTime) - Math.abs(questB.startTime.getTime() - currTime) : Math.abs(questB.startTime.getTime() - currTime) - Math.abs(questA.startTime.getTime() - currTime);
    } else {
      return order === `asc` ? Math.abs(questA.endTime.getTime() - currTime) - Math.abs(questB.endTime.getTime() - currTime) : Math.abs(questB.endTime.getTime() - currTime) - Math.abs(questA.endTime.getTime() - currTime);
    } 
  });

const parseQuests = (quests, currTime) => 
  new Promise(async (resolve, reject) => {
    try {
      // console.log(quests);
      const questParticipations = await Promise.all(quests.map(({ questName }) => 
        Participation.find({ questName }).exec()
      ));
      
      const parsedQuests = quests.map(({ _id, questName, hostUser, nature, description, startTime, endTime }, i) => 
        ({ questID: _id, questName, hostUser, nature, description, startTime, endTime,
          startDate: startTime.toDateString(), endDate: endTime.toDateString(), status: getQuestStatus(startTime, endTime, currTime),
          participantCount: questParticipations[i].length
        })
      );

      const hosts = await (Promise.all(quests.map((quest) => (
        Host.findOne({ username: quest.hostUser }).exec()
      ))));
      console.log(hosts);
      parsedQuests.forEach((quest, i) => {
        quest[`organization`] = hosts[i].organization;
        quest[`rating`] = hosts[i].rating;
      });
      // console.log(quests);
      resolve(parsedQuests);

    } catch (err) {

      reject(err);

    }
  })

const getHomeCards = (participantQuests, allQuests, currTime) => ({
    myQuests: sortQuestsByProximity(participantQuests, currTime, `startTime`, `asc`).slice(0, 4),
    popularQuests: allQuests.sort((qA, qB) => qB.participantCount - qA.participantCount).slice(0, 4)
  });

const getMyQuestCards = (participantQuests, currTime) => ({
    allQuests: participantQuests,
    liveQuests: participantQuests.filter(quest => quest.status === `Live`),
    upcomingQuests: participantQuests.filter(quest => quest.status === `Upcoming`),
    pastQuests: participantQuests.filter(quest => quest.status === `Past`)
  });

const getAllQuestCards = (allQuests) => allQuests;

const getParticipantHomepageCards = async (username) => {

  try {
      const currTime = Date.now();

      // fetch list of all quests in which participant registered
      const participantParticipations = await Participation.find({ participantUser: username }).sort({ createdAt: 'desc' }).exec();

      const allQuests = await parseQuests(await Quest.find({}).sort({ createdAt: 'desc' }).exec(), currTime);

      const participantQuests = [];
      
      participantParticipations.forEach((participation) => {
        participantQuests.push(allQuests.find((quest) => quest.questName === participation.questName));
      });

      return [{
        home: getHomeCards(participantQuests, allQuests, currTime),
        myQuests: getMyQuestCards(participantQuests, currTime),
        allQuests: getAllQuestCards(allQuests)
      }, undefined];
  }
  catch (err) {
    console.log(err);
    const errObjToReturn = handleErrorsFromDB(err);
    return [undefined, errObjToReturn];
  }
}

module.exports = { getParticipantHomepageCards };