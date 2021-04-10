//models
const Submission = require(`../../models/submission`);
const Question = require(`../../models/questions`);

// global variables
const FORBIDDEN_STATUS_CODE = 403;
const BAQ_REQUEST_STATUS_CODE = 400;
const CREATED_STATUS_CODE = 201;
const OK_STATUS_CODE = 200;

const { sendRes } = require(`../helpers/sendRes`);

const isAnswerValid = (answer) => {
  return true;
  // throw new Error(`implement isAnswerValid in attemptRound.js`);
}

const createNewSubmission = (req, currTime) => 
  new Promise(async (resolve, reject) => {
    try {
      resolve(await Submission.create({
        questName: req.body.questData.questName,
        roundNum: req.body.roundData.roundNum,
        participantUser: req.body.username,
        roundScore: 0,
        numOfQsSent: 0,
        answeredTill: 0,
        beginTime: new Date(currTime),
        expireTime: new Date(Math.min(currTime + req.body.roundData.timer*1000, (req.body.roundData.endTime).getTime()))
      }));
    } catch (err) {
      reject(err);
    }
  })

const attemptRound = async (req, res) => {

  // analyse request:
  // const initiate = req.body.answer ? true : false;

  // check karo submission of this round, agar hai tou phir 
  let submission = await findOne({ questName: req.body.questData.questName, roundNum: req.body.roundData.roundNum, participantUser: req.body.username });

  if (submission.isAttemptFinished) {
    sendRes(res, BAQ_REQUEST_STATUS_CODE, {
      errors: {},
      genericErrMsg: `You have already attempted`
    });
    return;
  }

  const currTime = Date.now();

  // check if submissions table doesnt have an entry for a req that doesnt have an ans
  if (!submission && req.body.answer) {
    sendRes(res, BAQ_REQUEST_STATUS_CODE, {
      errors: {},
      genericErrMsg: `Begin a round first. Don't come from the middle`
    });
    return;
  } else if (!submission) {
    // make a new submission
    submission = await createNewSubmission(req, currTime);
  }

  const questionRecieved = await Question.findOne({ questName: req.body.questData.questName, roundNum: req.body.roundData.roundNum, questionNum: submission.numOfQsSent });
  const questionToSend = await Question.findOne({ questName: req.body.questData.questName, roundNum: req.body.roundData.roundNum, questionNum: submission.numOfQsSent + 1 });
  let score = 0;

  if (req.body.answer) {
    if (!(isAnswerValid(req.body.answer))) {
      sendRes(res, BAQ_REQUEST_STATUS_CODE, {
        errors: {},
        genericErrMsg: `Answer is invalid`
      });
      return;
    } else {
      score = req.body.answer === questionRecieved.answer ? req.roundData.eachMarks : 0;
    }
  }

  const isAttemptFinished = !Boolean(questionToSend);

  // update the submission
  await Submission.updateOne({ questName: req.body.questData.questName, roundNum: req.body.roundData.roundNum, participantUser: req.body.username }, { numOfQsSent: submission.numOfQsSent + 1, roundScore: submission.roundScore + score, isAttemptFinished: isAttemptFinished });

  if (isAttemptFinished) {
    sendRes(res, CREATED_STATUS_CODE, {
      message: "questions exhausted",
      nextQuestion: {},
      expireTime: submission.expireTime
    });
    return;
  } else {
    sendRes(res, CREATED_STATUS_CODE, {
      nextQuestion: {
        questionNum: questionToSend.questionNum,
        statement: questionToSend.statement,
        options: questionToSend.options
      }, 
      expireTime: submission.expireTime
    });
    return;
  }
}

module.exports = { attemptRound };