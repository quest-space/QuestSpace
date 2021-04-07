const { Router } = require (`express`);
const router = Router();

// imports from other files
const Participant = require(`../models/participant`);
const { handleErrorsFromDB } = require(`./helperFunctions`);
const { createToken, maxAge } = require(`./jwsTokenization`);
const { sendRes } = require(`./sendRes`);

// status codes
const OK_STATUS_CODE = 200;
const CREATED_STATUS_CODE = 201;
const BAQ_REQUEST_STATUS_CODE = 400;

// sign up handler
router.post(`/signup/participant`, async (req, res) => {
  const { username, password, firstname, lastname, organization } = req.body;
  try {
    const participant = await Participant.create({ username, password, firstname, lastname, organization });
    const token = createToken(participant._id, participant.username, `participant`);
    res.cookie('qsUser', token, { httpOnly: true, maxAge: maxAge * 1000 });
    sendRes(res, CREATED_STATUS_CODE, {}) // req succeeded and led to a resource creation
  } catch (err) {
    sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err));
  }
});

// sign in handler
router.get(`/signin/participant`, async (req, res) => {
  const { username, password } = req.query;
  try {
    const participant = await Participant.login(username, password);
    const token = createToken(participant._id, participant.username, `participant`);
    res.cookie('qsUser', token, { httpOnly: true, maxAge: maxAge * 1000 });
    sendRes(res, OK_STATUS_CODE, {});
  } catch (err) {
    sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err));
  }
});

module.exports = router;