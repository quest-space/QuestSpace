const { Router } = require (`express`);
const router = Router();

router.use(`/signout`, require(`../authentication/signOutAPI`));

router.use(`/homepage`, require(`./homepage-home`));

router.get(`/quest/:questid`, (req, res) => {
  // nature: private -> requestor must be enrolled
  // nature: public -> requestor must be enrolled if it is a live or past quest
  res.status(200).json({
    message: `Your quest ID is ${req.params.questid} :')`
  });
})

module.exports = router;