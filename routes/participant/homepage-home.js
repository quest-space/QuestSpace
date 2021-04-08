const { Router } = require (`express`);
const Participant = require(`../../models/participant`);
const Quest = require(`../../models/quest`);
const Host = require(`../../models/host`);
const Rating = require(`../../models/ratings`);
const Participation = require(`../../models/participation`);

const router = Router();

const { handleErrorsFromDB } = require(`../helpers/helperFunctions`);
const { sendRes } = require(`../helpers/sendRes`)

// global variables
const BAQ_REQUEST_STATUS_CODE = 400;
const CREATED_STATUS_CODE = 201;
const OK_STATUS_CODE = 200;

// Session cookies will already be stored. Fetch username from there.

let username = 'HassaanAW';

router.post(`/`, async (req, res) => {
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
        sendRes(res, OK_STATUS_CODE , neededQuestData)

        // Promise.all(all_quests.map( async (val, index) => {
        //     try {
        //         let gather_data = {}
        //         let each_quest = await Quest.find({ questName: val.questName});
                            
        //         gather_data["questName"] = each_quest[0].questName
        //         gather_data["description"] = each_quest[0].description
        //         gather_data["startTime"] = (each_quest[0].startTime).toDateString()

        //         let host_data  = await Host.find({ username: each_quest[0].hostUser});
        //         gather_data["organization"] = host_data[0].organization // retrieved organization name

                // /* Add rating search here      
                // Create Pipeline over Rating such that filter of host username is passed, and avg is taken for rating.*/ 
                // let ratings = await Rating.aggregate(
                //     [
                //         { $match: { hostUser: host_data[0].username} },
                //         {  
                //             $group: {
                //                 _id: '$hostUser',
                //                 score: { $avg: '$score' }
                //             }
                //         }
                //     ]
                // )
        //         gather_data["rating"] = ratings[0].score 
        //         combined_data.push(gather_data)
        //         //console.log(combined_data)
        //         return Promise.resolve()
        //     }
        //     catch (err) {
        //         const errObjToReturn = handleErrorsFromDB(err);
        //         sendRes(res, BAQ_REQUEST_STATUS_CODE, errObjToReturn);
        //         return Promise.reject()
        //     }
        // })).then(console.log(combined_data))
        
        //sendRes(res, CREATED_STATUS_CODE, combined_data)
    }  
    catch (err) {
      const errObjToReturn = handleErrorsFromDB(err);
      sendRes(res, BAQ_REQUEST_STATUS_CODE, errObjToReturn);
    }
    
  });

module.exports = router;