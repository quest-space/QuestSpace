const { Router } = require (`express`);
const Participant = require(`../models/participant`);
const router = Router();

const { handleErrorsFromDB } = require(`./helperFunctions`)

// global variables
const BAQ_REQUEST_STATUS_CODE = 400;
const CREATED_STATUS_CODE = 201;

const sendReq = (res, statusCode, objToSend) => {
  res.status(statusCode).json(objToSend);
}

// add a new ninja to the db
router.post(`/signup/participant`, async (req, res) => {

  console.log(req.cookie);

  const { username, password, firstname, lastname, organization } = req.body;

  try {
    const participant = await Participant.create({ username, password, firstname, lastname, organization });

    res.cookie(`username`, participant.username, { maxAge: 1000 * 60 * 20, /* secure: true, */ httpOnly: true });
    sendReq(res, CREATED_STATUS_CODE, participant) // req succeeded and led to a resource creation

  } catch (err) {
    const errObjToReturn = handleErrorsFromDB(err);
    sendReq(res, BAQ_REQUEST_STATUS_CODE, errObjToReturn);
  }
  
});

// add a new ninja to the db
router.post(`/signin`, (req, res) => {
  res.send({
    request_type: `POST signin`,
    data_recieved: req.body
  });
});

module.exports = router;