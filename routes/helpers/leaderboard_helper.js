const Participant = require(`../../models/participant`);
const Quest = require(`../../models/quest`);
const Host = require(`../../models/host`);
const Rating = require(`../../models/ratings`);
const Participation = require(`../../models/participation`);
const Submission = require(`../../models/submission`);

const { handleErrorsFromDB, getQuestStatus } = require(`./helperFunctions`);

const { sendRes } = require(`./sendRes`);

// global variables
const FORBIDDEN_STATUS_CODE = 403;
const BAQ_REQUEST_STATUS_CODE = 400;
const OK_STATUS_CODE = 200;

/* What are the different types of leaderboards and its conditions?

Visible after Round Starts
Round Leaderboard -> Needs RoundNumber and QuestID

Visible after all Rounds End
Quest Leaderboard -> Needs QuestID

-Admin Side  
-Participant Side -> Need Participant Username to show their position on the leaderboard

Generic Functions. 
Required params: QuestID, type of user
Other params: Participant Usernam, RoundNumber

Send QuestID and RoundNumber in URL 

Convention:

function(QuestID, RoundNum, type of user, username)
If Overall Leaderboard is neended, send 0 in RoundNum
If admin side is asking, send Null in username

*/

const parseRound = (rounds) => 
  new Promise(async (resolve, reject) => {
    try {
        // console.log(rounds);
      const names = await Promise.all(rounds.map(({ participantUser }) => 
        Participant.find({ username: participantUser}, {firstname: 1, lastname:1}).exec()
      ));
      
      // Holds the leaderboard info of specified round
      const roundData = rounds.map(({ participantUser, roundScore}, i) => 
        ({ username: participantUser,
            roundScore: roundScore,
            name: names[i][0].firstname + ' ' + names[i][0].lastname,
            ranking: i+1
        })
      );

      resolve(roundData);
    } 
    catch(err){
        reject(err);
    }
  })

const parseQuest = (quest) => 
new Promise(async (resolve, reject) => {
try {
    // console.log(rounds);
    const names = await Promise.all(quest.map(({ _id }) => 
    Participant.find({ username: _id}, {firstname: 1, lastname:1}).exec()
    ));
    
    // Holds the leaderboard info of specified round
    const questData = quest.map(({ _id, roundScore}, i) => 
    ({ username: _id,
        roundScore: roundScore,
        name: names[i][0].firstname + ' ' + names[i][0].lastname,
        ranking: i+1
    })
    );

    resolve(questData);
} 
catch(err){
    reject(err);
}
})

const makeLeaderboard = async (QuestID, RoundNum, userType, username) => {
    try{
        if(RoundNum == 0){  // Leaderboard for Quest
            /*group by participant id first
              take sum of scores  */

            const to_send = {}

            const QuestName = await Quest.findOne({ _id: QuestID});
            const questName = QuestName.questName;

            const aggregate_score = await Submission.aggregate(
                [
                    { $match: {questName: questName} },
                    {  
                        $group: {
                            _id: '$participantUser',
                            roundScore: { $sum: '$roundScore' }
                        },
                    }, 
                    {$sort: {roundScore: -1}}
                ]
            )

            const leaderboard = await parseQuest(aggregate_score); // collected aggregated round data 
            
            to_send['full'] = leaderboard; // add to to_send object
            
            if(userType === "participant") // send individual information as well
            {
                const ind_record = leaderboard.find(rec => rec.username === username); 
                to_send['individual'] = ind_record;
            }
            return to_send;
        
        }
        else if(RoundNum != 0){ // Leaderboard for a Particular Round

            const to_send = {};
    
            const QuestName = await Quest.findOne({ _id: QuestID});
            const questName = QuestName.questName;

            const roundData = await Submission.find({ questName: questName, roundNum: RoundNum}, { participantUser: 1, roundScore: 1 }).sort({"roundScore":-1}).exec();
            const leaderboard = await parseRound(roundData); // collected round data        
            
            to_send['full'] = leaderboard; // add to to_send object
            
            if(userType === "participant") // send individual information as well
            {
                const ind_record = leaderboard.find(rec => rec.username === username); 
                to_send['individual'] = ind_record;
            }
            return to_send;
        }
    }
    catch(err){
        return err;
    }

}

module.exports = { makeLeaderboard };


