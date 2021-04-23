const { Router } = require (`express`);
const router = Router();

// imports from other files
const Participant = require(`../../models/participant`);
const Host = require(`../../models/host`);
const { handleErrorsFromDB } = require(`../helpers/helperFunctions`);
const { createToken, maxAge } = require(`./jwsTokenization`);
const { sendRes } = require(`../helpers/sendRes`);

// status codes
const OK_STATUS_CODE = 200;
const CREATED_STATUS_CODE = 201;
const BAQ_REQUEST_STATUS_CODE = 400;

// sign up handler [participant]
router.post(`/signup/participant`, async (req, res) => {
  const { username, password, firstname, lastname, dateofbirth, organization } = req.body;
  try {
    const participant = await Participant.create({ username, password, passwordlength: password.length, firstname, lastname, dateofbirth, organization });
    const token = createToken(participant._id, participant.username, `participant`);
    res.cookie('qsUser', token, { httpOnly: true, maxAge: maxAge * 1000 });
    sendRes(res, CREATED_STATUS_CODE, {}) // req succeeded and led to a resource creation
  } catch (err) {
    sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err));
  }
});

// sign up handler [host]
router.post(`/signup/host`, async (req, res) => {
  const { username, password, organization, phone, representativeName, representativeDesignation } = req.body;
  try {
    const host = await Host.create({ username, password, passwordlength: password.length, organization, phone, representativeName, representativeDesignation });
    const token = createToken(host._id, host.username, `host`);
    res.cookie('qsUser', token, { httpOnly: true, maxAge: maxAge * 1000 });
    sendRes(res, CREATED_STATUS_CODE, {}) // req succeeded and led to a resource creation
  } catch (err) {
    sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err));
  }
});

// sign in handler [participant]
router.post(`/signin/participant`, async (req, res) => {
  const { username, password } = req.body;
  try {
    const participant = await Participant.login(username, password);
    const token = createToken(participant._id, participant.username, `participant`);
    res.cookie('qsUser', token, { httpOnly: true, maxAge: maxAge * 1000 });
    sendRes(res, OK_STATUS_CODE, {});
  } catch (err) {
    sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err));
  }
});

// sign in handler [host]
router.post(`/signin/host`, async (req, res) => {
  const { username, password } = req.body;
  try {
    const host = await Host.login(username, password);
    const token = createToken(host._id, host.username, `host`);
    res.cookie('qsUser', token, { httpOnly: true, maxAge: maxAge * 1000 });
    sendRes(res, OK_STATUS_CODE, {});
  } catch (err) {
    sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err));
  }
});

module.exports = router;