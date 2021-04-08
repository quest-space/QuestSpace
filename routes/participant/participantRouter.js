const { Router } = require (`express`);
const router = Router();

router.use(`/homepage`, require(`./homepage-home`));

module.exports = router;