const { Router } = require (`express`);
const router = Router();

// imports from other files
const Participant = require(`../../models/participant`);
const Host = require(`../../models/host`);
const { handleErrorsFromDB } = require(`../helpers/helperFunctions`);
const { createToken, maxAge } = require(`./jwsTokenization`);
const { sendRes } = require(`../helpers/sendRes`);
const { getQSAdminCredentials } = require(`../qs-admin/qsAdminCredentials`);

// status codes
const OK_STATUS_CODE = 200;
const CREATED_STATUS_CODE = 201;
const BAQ_REQUEST_STATUS_CODE = 400;

// sign up handler [participant]
router.post(`/signup/participant`, async (req, res) => {
  const { username, password, firstname, lastname, dateofbirth, organization } = req.body;
  try {
    const participant = await Participant.create({ username: username.trim(), password: password.trim(), passwordlength: (password.trim()).length, firstname, lastname, dateofbirth, organization });
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
    const host = await Host.create({ username: username.trim(), password: password.trim(), passwordlength: (password.trim()).length, organization, phone, representativeName, representativeDesignation });
    const token = createToken(host._id, host.username, `host`);
    res.cookie('qsUser', token, { httpOnly: true, maxAge: maxAge * 1000 });
    sendRes(res, CREATED_STATUS_CODE, {}) // req succeeded and led to a resource creation
  } catch (err) {
    sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err));
  }
});

// sign in handler [participant]
router.post(`/signin/participant`, async (req, res) => {
  req.body.username = req.body.username.trim();
  req.body.password = req.body.password.trim();
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
  req.body.username = req.body.username.trim();
  req.body.password = req.body.password.trim();  
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

const ensureCorrectQSAdminCredentials = (req) => {
  req.body.username = req.body.username.trim();
  req.body.password = req.body.password.trim();
  const { username, password } = req.body;
  const qsAdminCredentials = getQSAdminCredentials();
  if (!username) {  
    throw Error(`frd234sf,username,Username is required.,${username}`);
  } 
  if (!password) {
    throw Error(`frd234sf,password,Password is required.,${password}`);
  }
  if (username === qsAdminCredentials.username) {
    if (password === qsAdminCredentials.password) {
      return;
    } else {
      throw Error(`frd234sf,password,Incorrect password.,${password}`);
    }
  } else {
    throw Error(`frd234sf,username,Incorrect username.,${username}`);
  }
}

// sign in handler [qsAdmin]
router.post(`/signin/qs-admin`, async (req, res) => {
  try {
    ensureCorrectQSAdminCredentials(req);
    const token = createToken(`NoAvailableID`, `QS-Admin`, `qs-admin`);
    res.cookie('qsUser', token, { httpOnly: true, maxAge: maxAge * 1000 });
    sendRes(res, OK_STATUS_CODE, {});
  } catch (err) {
    sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err));
  }
});

module.exports = router;
