const { Router } = require (`express`);
const router = Router();

router.use(`/signout`, require(`../authentication/signOutAPI`));
router.use(`/homepage`, require(`./qsAdminHomepage`));

module.exports = router;