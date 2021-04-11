// add a new ninja to the db
router.post('/signup/participant', async (req, res) => {

  const requiredParams = [`username`, `password`, `firstname`, `lastname`, `organization`];
  const errObjForMissingParams = getMissingParamsErr(req.body, requiredParams);

  if (errObjForMissingParams) {
    sendReq(res, BAQ_REQUEST_STATUS_CODE, errObjForMissingParams);
  } else {

    const { username, password, firstname, lastname, organization } = req.body;
  
    try {
      const participant = await Participant.create({ username, password, firstname, lastname, organization });
      sendReq(res, CREATED_STATUS_CODE, participant) // req succeeded and led to a resource creation
    } catch (err) {
      const errObjToReturn = handleErrorsFromDB(err);
      sendReq(res, BAQ_REQUEST_STATUS_CODE, errObjToReturn);
    }

  }
  
});


const extractUpcomingQuests = (quests, currTime) => 
  quests.filter((quest) => quest[0].startTime.getTime() > currTime);

const extractLiveQuests = (quests, currTime) => 
  quests.filter((quest) => ((quest[0].startTime.getTime() <= currTime) && (quest[0].endTime.getTime() > currTime)));

const extractPastQuests = (quests, currTime) => 
  quests.filter((quest) => quest[0].endTime.getTime() <= currTime);

const fetchHomepageCardsOld = async (username, userType, cardTypes) => {
  
  if (userType !== `participant`) {
    throw new Error(`fetchCard for userType ${userType} is not implemented.`)
  }

  try {
      
      // fetch list of all quests in which participant registered
      const allQuests = await Participation.find({ participantUser: username });











      const questDatas = await (Promise.all(allQuests.map(async (val) => 
          Quest.find({ questName: val.questName})
      )));
      console.log(questDatas);

      const currTime = Date.now();

      // const liveQuests = extractLiveQuests(questDatas, currTime);
      // console.log(liveQuests);
      const sortedLiveQuests = sortQuestsByProximity(questDatas, `startTime`, currTime);
      console.log(sortedLiveQuests);

      const neededQuestData = sortedLiveQuests.map((questData) => ({
        questID: questData[0]._id,
        questName: questData[0].questName,
        description: questData[0].description,
        startTime: (questData[0].startTime).toDateString(),
        endTime: (questData[0].endTime).toDateString(),
        organization: questData[0].hostUser,
        rating: questData[0].rating
      }));
      // console.log(neededQuestData);

      const hostDatasForQuest = await (Promise.all(sortedLiveQuests.map((questData) => (
          Host.find({ username: questData[0].hostUser })
      ))));

      neededQuestData.forEach((questData, i) => {
          questData[`organization`] = hostDatasForQuest[i][0].organization; //.find((hostData) => hostData[0].username === questData[`organization`])[0].organization;
      });

      return [neededQuestData, undefined];
  }
  catch (err) {
    console.log(err);
    const errObjToReturn = handleErrorsFromDB(err);
    return [undefined, errObjToReturn];
  }
}
const sortQuestsByOrder = (quests, key, order) =>
  quests.sort((questA, questB) => {
    if (key === `startTime`) {
      return order === `asc` ? questA[0].startTime.getTime() - questB[0].startTime.getTime() : questB[0].startTime.getTime() - questA[0].startTime.getTime();
    } else {
      return order === `asc` ? questA[0].endTime.getTime() - questB[0].endTime.getTime() : questB[0].endTime.getTime() - questA[0].endTime.getTime();
    }
  });
