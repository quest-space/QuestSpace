const Participant = require(`../../models/participant`);
const Quest = require(`../../models/quest`);
const Host = require(`../../models/host`);
const Rating = require(`../../models/ratings`);
const Participation = require(`../../models/participation`);

const { handleErrorsFromDB } = require(`./helperFunctions`);

const DEFAULT_RATING = 3;

let username = 'HassaanAW';

const sortQuests = (quests, key, order) =>
  quests.sort((questA, questB) => {
    if (key === `startTime`) {
      return order === `asc` ? questA[0].startTime.getTime() - questB[0].startTime.getTime() : questB[0].startTime.getTime() - questA[0].startTime.getTime();
    } else {
      return order === `asc` ? questA[0].endTime.getTime() - questB[0].endTime.getTime() : questB[0].endTime.getTime() - questA[0].endTime.getTime();
    }
  });

const extractLiveQuests = (quests, currTime) => 
  quests.filter((quest) => ((quest[0].startTime.getTime() < currTime) && (quest[0].endTime.getTime() > currTime)));

const fetchCard = async (username, userType, cardTypes) => {
  
  if (userType !== `participant`) {
    throw new Error(`fetchCard for userType ${userType} is not implemented.`)
  }

  try {
      
      // fetch list of all quests in which participant registered
      const allQuests = await Participation.find({ participantUser: username });
      console.log(allQuests);

      const questDatas = await (Promise.all(allQuests.map(async (val) => 
          Quest.find({ questName: val.questName})
      )));
      console.log(questDatas);

      const currTime = Date.now();

      const liveQuests = extractLiveQuests(questDatas, currTime);
      console.log(liveQuests);
      const sortedLiveQuests = sortQuests(liveQuests, `startTime`, `asc`);
      console.log(sortedLiveQuests);

      const neededQuestData = sortedLiveQuests.map((questData) => ({
        questID: questData[0]._id,
        questName: questData[0].questName,
        description: questData[0].description,
        startTime: (questData[0].startTime).toDateString(),
        endTime: (questData[0].endTime).toDateString(),
        organization: questData[0].hostUser,
        rating: questData[0].hostUser
      }));
      console.log(neededQuestData);

      const hostDatasForQuest = await (Promise.all(sortedLiveQuests.map((questData) => (
          Host.find({ username: questData[0].hostUser })
      ))));

      neededQuestData.forEach((questData) => {
          questData[`organization`] = hostDatasForQuest.find((hostData) => hostData[0].username === questData[`organization`])[0].organization;
      });

      // const ratings = await (Promise.all(neededQuestData.map((questData) => (
      //     Rating.aggregate(
      //         [
      //             { $match: { hostUser: questData[`rating`]} },
      //             {  
      //                 $group: {
      //                     _id: '$hostUser',
      //                     score: { $avg: '$score' }
      //                 }
      //             }
      //         ]
      //     )
      // ))));
      
      // ratings.forEach((rating, i) => {
      //   neededQuestData[i][`rating`] = rating.length ? rating[0].score : DEFAULT_RATING;
      // });

      return [neededQuestData, undefined];
  }
  catch (err) {
    console.log(err);
    const errObjToReturn = handleErrorsFromDB(err);
    return [undefined, errObjToReturn];
  }
}

module.exports = { fetchCard };