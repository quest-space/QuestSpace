const { Router } = require (`express`);
const Participant = require(`../../models/participant`);
const Quest = require(`../../models/quest`);
const Host = require(`../../models/host`);

const router = Router();
const { sendRes } = require(`./sendRes`);
const { getValidQuests } = require(`./authenticateQuestAccess`);

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

    const questData = quests.map((key, i) => 
    ({  questID: key._id,
        questName: key.questName,
        hostUser: key.hostUser,
        nature: key.nature,
        description: key.description,
        startTime: key.startTime,
        endTime: key.endTime,
        logoURL: key.logoURL,
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

const makeRE = (key) => 
  key.replace(/[\[\]\\\^\$\.\|\?\*\+\(\)]/g,  '\\$&');

router.post(`/`, async (req, res) => {
    const initkey = req.body.key;

    if (!initkey) {
      sendRes(res, BAQ_REQUEST_STATUS_CODE, {
        error: "No key was provided"
      });
      return;
    }

    const key = makeRE(initkey);
    console.log({initkey, key});

    try{
        const quests  = await Quest.find( { 'questName' : { '$regex' : key, '$options' : 'i' } } )

        const detailed = await parseQuest(await getValidQuests(req.body.userType, req.body.username, quests, Date.now()));
        if(detailed.length === 0){
            sendRes(res, BAQ_REQUEST_STATUS_CODE, {"error": "None"});
        }
        else{
            sendRes(res, OK_STATUS_CODE, {
              searchResults: groupArr(detailed)
            });
        }
    }
    catch(err)
    {
        sendRes(res, BAQ_REQUEST_STATUS_CODE, err);
    }
});

module.exports = router;