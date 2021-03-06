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
        numOfQsSent: 1,
        answeredTill: 0,
        beginTime: new Date(currTime),
        expireTime: req.body.roundData.roundType === `Quiz` ? new Date((req.body.roundData.endTime).getTime()) : new Date(Math.min(currTime + req.body.roundData.timer*1000, (req.body.roundData.endTime).getTime()))
      }));
    } catch (err) {
      reject(err);
    }
  })

const attemptRapidFire = async (req, res) => {
    // analyse request:
  // const initiate = req.body.answer ? true : false;

  // check karo submission of this round, agar hai tou phir 
  let submission = await Submission.findOne({ questName: req.body.questData.questName, roundNum: req.body.roundData.roundNum, participantUser: req.body.username });

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

  if (submission.isAttemptFinished) {
    sendRes(res, BAQ_REQUEST_STATUS_CODE, {
      errors: {},
      genericErrMsg: `You have already attempted`
    });
    return;
  }

  if (currTime > submission.expireTime.getTime()) {
    sendRes(res, FORBIDDEN_STATUS_CODE, {
      errors: {},
      genericErrMsg: `Round has expired!`,
      expireTime: submission.expireTime,
      expireDateTime: submission.expireTime.toString(),
      currTime: (new Date(currTime)).toString()
    });
    return;
  }  

  const nextQuestion = await Question.findOne({ questName: req.body.questData.questName, roundNum: req.body.roundData.roundNum, questionNum: submission.numOfQsSent });
  const nextnextQuestion = await Question.findOne({ questName: req.body.questData.questName, roundNum: req.body.roundData.roundNum, questionNum: submission.numOfQsSent + 1 });
  let score = 0;
  let questionsAnswered = 0;
  let questionToSend = nextQuestion;
  let questionForWhichAnsWasReceieved = undefined;

  if (req.body.answer) {
    if (!(isAnswerValid(req.body.answer))) {
      sendRes(res, BAQ_REQUEST_STATUS_CODE, {
        errors: {},
        genericErrMsg: `Answer is invalid`
      });
      return;
    } else {
      questionForWhichAnsWasReceieved = nextQuestion;
      score = req.body.answer == questionForWhichAnsWasReceieved.answer ? req.body.roundData.eachMarks : 0;
      questionsAnswered++;
      questionToSend = nextnextQuestion;
    }
  }

  const isAttemptFinished = !Boolean(questionToSend);

  // update the submission
  await Submission.updateOne({ questName: req.body.questData.questName, roundNum: req.body.roundData.roundNum, participantUser: req.body.username }, { numOfQsSent: submission.numOfQsSent + questionsAnswered, roundScore: submission.roundScore + score, isAttemptFinished: isAttemptFinished });

  if (isAttemptFinished) {
    sendRes(res, CREATED_STATUS_CODE, {
      message: "questions exhausted",
      nextQuestion: {},
      expireTime: submission.expireTime,
      expireDateTime: submission.expireTime.toString(),
      currTime: (new Date(currTime)).toString(),
      score: score,
      answerStatus: score ? `correct` : `incorrect`,
      roundScore: submission.roundScore + score,
      roundType: req.body.roundData.roundType
    });
    return;
  } else {
    // by default make it for MCQ with no imageURL
    const nextQuestion = {
      questionNum: questionToSend.questionNum,
      statement: questionToSend.statement,
      options: questionToSend.options,
      questionNum: questionToSend.questionNum
    };
    // add imageURL if there is any
    if (questionToSend.imageURL !== "") {
      nextQuestion[`imageURL`] = questionToSend.imageURL;
    }
    sendRes(res, CREATED_STATUS_CODE, {
      nextQuestion, 
      expireTime: submission.expireTime,
      expireDateTime: submission.expireTime.toString(),
      currTime: (new Date(currTime)).toString(),
      score: score,
      answerStatus: score ? `correct` : `incorrect`,
      roundScore: submission.roundScore + score,
      roundType: req.body.roundData.roundType
    });
    return;
  }
}

const attemptQuiz = async (req, res) => {
  // analyse request:
  // const initiate = req.body.answer ? true : false;

  // check karo submission of this round, agar hai tou phir 
  let submission = await Submission.findOne({ questName: req.body.questData.questName, roundNum: req.body.roundData.roundNum, participantUser: req.body.username });

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

  if (submission.isAttemptFinished) {
    sendRes(res, BAQ_REQUEST_STATUS_CODE, {
      errors: {},
      genericErrMsg: `You have already attempted`
    });
    return;
  }

  if (currTime > submission.expireTime.getTime()) {
    sendRes(res, FORBIDDEN_STATUS_CODE, {
      errors: {},
      genericErrMsg: `Round has expired!`,
      expireTime: submission.expireTime,
      expireDateTime: submission.expireTime.toString(),
      currTime: (new Date(currTime)).toString()
    });
    return;
  }  

  const nextQuestion = await Question.findOne({ questName: req.body.questData.questName, roundNum: req.body.roundData.roundNum, questionNum: submission.numOfQsSent });
  const nextnextQuestion = await Question.findOne({ questName: req.body.questData.questName, roundNum: req.body.roundData.roundNum, questionNum: submission.numOfQsSent + 1 });
  let score = 0;
  let questionsAnswered = 0;
  let questionToSend = nextQuestion;
  let questionForWhichAnsWasReceieved = undefined;

  if (req.body.answer) {
    if (!(isAnswerValid(req.body.answer))) {
      sendRes(res, BAQ_REQUEST_STATUS_CODE, {
        errors: {},
        genericErrMsg: `Answer is invalid`
      });
      return;
    } else {
      questionForWhichAnsWasReceieved = nextQuestion;
      score = req.body.answer == questionForWhichAnsWasReceieved.answer ? req.body.roundData.eachMarks : 0;
      questionsAnswered++;
      questionToSend = nextnextQuestion;
    }
  }

  const isAttemptFinished = !Boolean(questionToSend);

  // update the submission
  await Submission.updateOne({ questName: req.body.questData.questName, roundNum: req.body.roundData.roundNum, participantUser: req.body.username }, { numOfQsSent: submission.numOfQsSent + questionsAnswered, roundScore: submission.roundScore + score, isAttemptFinished: isAttemptFinished });

  if (isAttemptFinished) {
    sendRes(res, CREATED_STATUS_CODE, {
      message: "questions exhausted",
      nextQuestion: {},
      expireTime: submission.expireTime,
      expireDateTime: submission.expireTime.toString(),
      currTime: (new Date(currTime)).toString(),
      score: score,
      answerStatus: score ? `correct` : `incorrect`,
      roundScore: submission.roundScore + score,
      roundType: req.body.roundData.roundType
    });
    return;
  } else {
    // by default make it for MCQ with no URL
    const nextQuestion = {
      questionNum: questionToSend.questionNum,
      statement: questionToSend.statement,
      options: questionToSend.options,
      questionNum: questionToSend.questionNum
    };
    // if it is a Quiz and is Numeric, make it equal to empty array (just in case)
    if (req.body.roundData.roundType === `Quiz` && questionToSend.questionType === `Numeric`) {
      nextQuestion[`options`] = [];
    }
    // add imageURL if there is any
    if (questionToSend.imageURL !== "") {
      nextQuestion[`imageURL`] = questionToSend.imageURL;
    }
    sendRes(res, CREATED_STATUS_CODE, {
      nextQuestion, 
      expireTime: submission.expireTime,
      expireDateTime: submission.expireTime.toString(),
      currTime: (new Date(currTime)).toString(),
      score: score,
      answerStatus: score ? `correct` : `incorrect`,
      roundScore: submission.roundScore + score,
      roundType: req.body.roundData.roundType
    });
    return;
  }
}

const attemptSubmissionBased = async (req, res) => {
  // check karo submission of this round, agar hai tou phir 
  let submission = await Submission.findOne({ questName: req.body.questData.questName, roundNum: req.body.roundData.roundNum, participantUser: req.body.username });

  const currTime = Date.now();

  if (submission) {
    sendRes(res, BAQ_REQUEST_STATUS_CODE, {
      errors: {},
      genericErrMsg: `You have already attempted`
    });
    return;
  }

  if (currTime > req.body.roundData.endTime.getTime()) {
    sendRes(res, BAQ_REQUEST_STATUS_CODE, {
      errors: {},
      genericErrMsg: `Round has expired!`
    });
    return;
  }

  // send sawal back
  const questionToSend = await Question.findOne({ questName: req.body.questData.questName, roundNum: req.body.roundData.roundNum, questionNum: 1 });
  // by default make it for MCQ with no imageURL
  const nextQuestion = {
    statement: questionToSend.statement,
    questionNum: questionToSend.questionNum
  };
  // add imageURL if there is any
  if (questionToSend.imageURL !== "") {
    nextQuestion[`imageURL`] = questionToSend.imageURL;
  }
  sendRes(res, CREATED_STATUS_CODE, {
    nextQuestion, 
    expireTime: req.body.roundData.endTime,
    totalMarks: req.body.roundData.totalMarks,
    roundType: req.body.roundData.roundType
  });
  return;
}

const attemptRound = async (req, res) => {
  if (req.body.roundData.roundType === `Rapid Fire`) {
    attemptRapidFire(req, res);
  } else if (req.body.roundData.roundType === `Quiz`) {
    attemptQuiz(req, res);
  } else {
    attemptSubmissionBased(req, res);
  }
}

module.exports = { attemptRound };