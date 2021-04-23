const { Router } = require (`express`);
const router = Router();

const { sendRes } = require(`./helpers/sendRes`);
const BAQ_REQUEST_STATUS_CODE = 400;
const OK_STATUS_CODE = 200;


// routes API requests to different files
router.use(`/auth`, require(`./authentication/signUpInAPIs`));
// Filters authenticated users and refreshes their authentication:
// router.use(require(`./authentication/authenticateUser`));
// An authenticated user is who
// 1. routes at /api/participant or /api/host
// 2. has a token in cookie
// 3. token is valid
// 4. if token is for participant, it is routing to /api/participant, and if it is
//    host, it is routing to /api/host

// As an alternative, use this:
router.use(require(`./authentication/defaultAuthentication`));

router.post(`/who-am-i`, (req, res) => {
    try {
      sendRes(res, OK_STATUS_CODE, {
        username: req.body.username,
        type: req.body.userType
      });
    }
    catch(err) {
      console.log("Error")
      sendRes(res, BAQ_REQUEST_STATUS_CODE, {
        error: err
      });
    }
  });
  
  

router.use(`/participant`, require(`./participant/participantRouter`));

router.use(`/host`, require(`./host/hostRouter`));


module.exports = router;
