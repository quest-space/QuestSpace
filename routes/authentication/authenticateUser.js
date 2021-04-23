const jwt = require(`jsonwebtoken`);
const { Router } = require (`express`);
const router = Router();

// imported files
const { createToken, verifyToken, maxAge } = require(`./jwsTokenization`);
const { sendRes } = require(`../helpers/sendRes`);

// status codes
const UNAUTHORIZED_STATUS_CODE = 401;
const FORBIDDEN_STATUS_CODE = 403;
const NOT_FOUND_STATUS_CODE = 404;

// set vars to be used in routes
const setGenericVars = (req, decodedToken) => {
  req.body.id = decodedToken.id;
  req.body.username = decodedToken.username;
  req.body.userType = decodedToken.type;
}

// filter out authentic users
router.use(`/:type`, async (req, res, next) => {
  if (req.params.type === `participant` || req.params.type === `host` || req.params.type === `who-am-i`) {
    const token = req.cookies.qsUser;
    if (token) {
      try {
        const decodedToken = await verifyToken(token);
        // check if this is correct type of User
        if (req.params.type === `who-am-i` || (decodedToken.type === req.params.type)) {
          // console.log(`${decodedToken.type} and ${req.params.type} are equal`);
          // set vars
          setGenericVars(req, decodedToken);
          // console.log(req.body);
          // send new cookie
          const newToken = createToken(decodedToken.id, decodedToken.username, decodedToken.type);
          res.cookie('qsUser', newToken, { httpOnly: true, maxAge: maxAge * 1000 });
          // move one
          next();
          return;
        } else {
          sendRes(res, UNAUTHORIZED_STATUS_CODE, {
            errors: {},
            genericErrMsg: `No authorization for this resource`
          });
        }
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
  } else {
    sendRes(res, NOT_FOUND_STATUS_CODE, {
      errors: {},
      genericErrMsg: `API not found`
    });
  }
});

module.exports = router;