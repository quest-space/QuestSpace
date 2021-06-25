
const { Router } = require (`express`);
const router = Router();

router.use((req, res, next) => {
  req.body.id = "6070f3b5535b23e65b3d0160";
  req.body.username = "talha456";
  req.body.userType = `participant`;
  req.id = "6070f3b5535b23e65b3d0160";
  req.username = "talha456";
  req.userType = `participant`;
  next();
})

router.use(`/:type`, (req, res, next) => {
  if (req.params.type === `participant` || req.params.type === `host`) {
    req.body.id = "6070f3b5535b23e65b3d0160";
    req.body.username = req.params.type === `participant` ? "talha456" : "gacs.lges";
    req.body.userType = req.params.type;
    req.id = "6070f3b5535b23e65b3d0160";
    req.username = req.params.type === `participant` ? "talha456" : "gacs.lges";
    req.userType = req.params.type;
  } else if (req.params.type === `qs-admin`) {
    req.body.id = "NoAvailableID";
    req.body.username = "QS-Admin";
    req.body.userType = "qs-admin";
    req.id = "NoAvailableID";
    req.username = "QS-Admin";
    req.userType = "qs-admin";
  }
  next();
})

module.exports = router;
