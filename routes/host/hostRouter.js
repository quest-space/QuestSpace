const { Router } = require (`express`);
const router = Router();

router.use(`/signout`, require(`../authentication/signOutAPI`));
router.use(`/leaderboard`, require(`./leaderboard`));

module.exports = router;