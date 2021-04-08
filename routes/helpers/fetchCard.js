const Participant = require(`../../models/participant`);
const Quest = require(`../../models/quest`);
const Host = require(`../../models/host`);
const Rating = require(`../../models/ratings`);
const Participation = require(`../../models/participation`);

const { handleErrorsFromDB } = require(`./helperFunctions`);

let username = 'HassaanAW';

const fetchCard = async (username, res) => {
    try {
        // fetch list of all quests in which participant registered
        const all_quests = await Participation.find({ participantUser: username});
        
        const questDatas = await (Promise.all(all_quests.map(async (val) => 
            Quest.find({ questName: val.questName})
        )));
        console.log(questDatas)

        

        const neededQuestData = questDatas.map((questData) => ({
            questName: questData[0].questName,
            description: questData[0].description,
            startTime: (questData[0].startTime).toDateString(),
            organization: questData[0].hostUser,
            rating: questData[0].hostUser
        }));

        const hostDatasForQuest = await (Promise.all(questDatas.map((questData) => (
            Host.find({ username: questData[0].hostUser })
        ))));

        neededQuestData.forEach((questData) => {
            questData[`organization`] = hostDatasForQuest.find((hostData) => hostData[0].username === questData[`organization`])[0].organization;
        });

        const ratings = await (Promise.all(neededQuestData.map((questData) => (
            Rating.aggregate(
                [
                    { $match: { hostUser: questData[`rating`]} },
                    {  
                        $group: {
                            _id: '$hostUser',
                            score: { $avg: '$score' }
                        }
                    }
                ]
            )
        ))))

        ratings.forEach((rating, i) => {
            neededQuestData[i][`rating`] = rating[0].score;
        });
        return neededQuestData;
    }  
    catch (err) {
      const errObjToReturn = handleErrorsFromDB(err);
      sendRes(res, BAQ_REQUEST_STATUS_CODE, errObjToReturn);
    }
    
  });

module.exports = router;