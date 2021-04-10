//models
const Submission = require(`../../models/submission`);

// global variables
const FORBIDDEN_STATUS_CODE = 403;
const BAQ_REQUEST_STATUS_CODE = 400;
const OK_STATUS_CODE = 200;

const { sendRes } = require(`../helpers/sendRes`);

// fresh candidate beginning his round
const beginAttemptingRound = (res, req) => {

  const currTime = Date.now();

  // make an entry in the submission table

  // give the next question to the client and the endtime of the round

}

const continueRound = (req, res, submission) => {

  // verify if question is valid in question.

  // award score to it

  // update the submission table.

  // response
  // give the next question to the client and the endtime of the round

}

const createNewSubmission = (req, res) => 
  new Promise(async (resolve, reject) => {
    try {
      resolve(await Submission.create({
        questName: req
      }));
    } catch (err) {
      reject(err);
    }
  })


const attemptRound = async (req, res) => {

  // analyse request:
  // const initiate = req.body.answer ? true : false;

  // check karo submission of this round, agar hai tou phir 
  const submission = await findOne({ questName: req.body.questData.questName, roundNum: req.body.roundData.roundNum, participantUser: req.body.username });

  // check if submissions table doesnt have an entry for a req that doesnt have an ans
  if (!submission && req.body.answer) {
    sendRes(res, BAQ_REQUEST_STATUS_CODE, {
      errors: {},
      genericErrMsg: `Begin a round first. Don't come from the middle`
    });
    return;
  } else if (!submission) {
    // make a new submission
    const submission = Submission.create({  })
  }
  
}

module.exports = { attemptRound };