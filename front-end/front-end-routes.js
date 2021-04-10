const express = require('express');
router = express.Router();

// set up static files
// router.use(express.static('public_html'));
router.use("/",express.static("front-end/build"));
router.use("/signin",express.static("front-end/build"));
router.use("/signup",express.static("front-end/build"));
router.use("/participanthomepage",express.static("front-end/build"));
router.use("/navbar2",express.static("front-end/build"));


module.exports = router;

