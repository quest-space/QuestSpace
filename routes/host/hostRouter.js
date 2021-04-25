const { Router } = require (`express`);
const router = Router();

router.use(`/signout`, require(`../authentication/signOutAPI`));
// router.use(`/leaderboard`, require(`./leaderboard`));
router.use(`/homepage`, require(`./homepage`))
router.use(`/profile`, require(`./host-profile`));
router.use(`/search`, require(`../helpers/search`));
router.use(`/create-quest`, require(`./createQuest`));
router.use(`/quest`, require(`./quest-details`));

module.exports = router;