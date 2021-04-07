const jwt = require(`jsonwebtoken`);
const { Router } = require (`express`);
const router = Router();

// imported files
const { createToken, verifyToken, maxAge } = require(`./jwsTokenization`);
const { sendRes } = require(`./sendRes`);

// status codes
const UNAUTHORIZED_STATUS_CODE = 401;
const FORBIDDEN_STATUS_CODE = 403;

// set vars to be used in routes
const setGenericVars = (req, decodedToken) => {
  req.body.id = decodedToken.id;
  req.body.username = decodedToken.username;
  req.body.type = decodedToken.type;
}

// filter out authentic users
router.use(`*`, async (req, res, next) => {
  const token = req.cookies.qsUser;
  if (token) {
    try {
      const decodedToken = await verifyToken(token);
      setGenericVars(req, decodedToken);
      // send new cookie
      const newToken = createToken(decodedToken.id, decodedToken.username, `participant`);
      res.cookie('qsUser', newToken, { httpOnly: true, maxAge: maxAge * 1000 });
      // move one
      next();
    } catch (err) {
      // console.log(err);
      sendRes(res, FORBIDDEN_STATUS_CODE, {
        errors: {},
        genericErrMsg: `Unrecognized identity`
      });
    }
  } else {
    sendRes(res, UNAUTHORIZED_STATUS_CODE, {
      errors: {},
      genericErrMsg: `No identification`
    });
  }
});

module.exports = router;