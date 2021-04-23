
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

module.exports = router;