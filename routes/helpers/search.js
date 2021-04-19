const { Router } = require (`express`);
const Participant = require(`../../models/participant`);
const Quest = require(`../../models/quest`);
const Host = require(`../../models/host`);

const router = Router();
const { sendRes } = require(`./sendRes`);

// global variables
const BAQ_REQUEST_STATUS_CODE = 400;
const CREATED_STATUS_CODE = 201;
const OK_STATUS_CODE = 200;

// Session cookies will already be stored. Fetch username from there.
const parseQuest = (quests) => 
new Promise(async (resolve, reject) => {
try {
    const hostInfo = await Promise.all(quests.map(({ hostUser }) => 
    Host.find({ username: hostUser}).exec()
    ));

    const questData = quests.map((key, i) => 
    ({  questID: key._id,
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
        rating: hostInfo[i][0].rating
    })
    );

    resolve(questData);
} 
catch(err){
    reject(err);
}
})

router.post(`/`, async (req, res) => {
    const key = req.body.key;

    try{
        const quests  = await Quest.find( { 'questName' : { '$regex' : '^' + key, '$options' : 'i' } } )

        const detailed = await parseQuest(quests);
        if(detailed.length === 0){
            sendRes(res, BAQ_REQUEST_STATUS_CODE, {"error": "None"});    
        }
        else{
            sendRes(res, OK_STATUS_CODE, detailed);
        }
    }
    catch(err)
    {
        sendRes(res, BAQ_REQUEST_STATUS_CODE, err);
    }
});

module.exports = router;