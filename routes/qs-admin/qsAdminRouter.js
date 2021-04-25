const { Router } = require (`express`);
const router = Router();

router.use(`/signout`, require(`../authentication/signOutAPI`));
router.use(`/homepage`, require(`./qsAdminHomepage`));
router.use(`/accept`, require(`./acceptQuestRequest`));
router.use(`/reject`, require(`./rejectQuestRequest`));

module.exports = router;