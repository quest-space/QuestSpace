
const { Router } = require (`express`);
const router = Router();

router.use((req, res, next) => {
  console.log(`dsff`);
  req.body.id = "6070f3b5535b23e65b3d0160";
  req.body.username = "HassaanAW";
  req.body.userType = `participant`;
  req.params.id = "6070f3b5535b23e65b3d0160";
  req.query.username = "HassaanAW";
  req.params.userType = `participant`;
  next();
})

module.exports = router;