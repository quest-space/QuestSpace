const express = require('express');
router = express.Router();

// set up static files
// router.use(express.static('public_html'));
router.use("/participanthomepage/quest/:questID/round/:roundID", express.static("front-end/build"));
router.use("/participanthomepage/quest/:questID", express.static("front-end/build"));
router.use("/hosthomepage/quest/:questID/round/:roundID", express.static("front-end/build"));
router.use("/hosthomepage/quest/:questID", express.static("front-end/build"));
router.use("/hosthomepage/createquest", express.static("front-end/build"));

router.use("/", express.static("front-end/build"));
router.use("/signin", express.static("front-end/build"));
router.use("/signup", express.static("front-end/build"));
router.use("/qsadminsignin", express.static("front-end/build"));
router.use("/qsadminhomepage", express.static("front-end/build"));
router.use("/participanthomepage", express.static("front-end/build"));
router.use("/hosthomepage/createquest", express.static("front-end/build"));
router.use("/hosthomepage", express.static("front-end/build"));

module.exports = router;

