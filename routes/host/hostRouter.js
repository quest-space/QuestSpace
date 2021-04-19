const { Router } = require (`express`);
const router = Router();

router.use(`/signout`, require(`../authentication/signOutAPI`));
router.use(`/leaderboard`, require(`./leaderboard`));
router.use(`/search`, require(`../helpers/search`));

module.exports = router;