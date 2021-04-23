
const { Router } = require (`express`);
const router = Router();

router.use((req, res, next) => {
  req.body.id = "6070f3b5535b23e65b3d0160";
  req.body.username = "HassaanAW";
  req.body.userType = `participant`;
  req.id = "6070f3b5535b23e65b3d0160";
  req.username = "HassaanAW";
  req.userType = `participant`;
  next();
})

router.use(`/:type`, (req, res, next) => {
  if (req.params.type === `participant` || req.params.type === `host`) {
    req.body.id = "6070f3b5535b23e65b3d0160";
    req.body.username = req.params.type === `participant` ? "HassaanAW" : "Admin";
    req.body.userType = req.params.type;
    req.id = "6070f3b5535b23e65b3d0160";
    req.username = req.params.type === `participant` ? "HassaanAW" : "Admin";
    req.userType = req.params.type;
  }
  next();
})

module.exports = router;