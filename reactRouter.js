const express = require('express');
router = express.Router();

const { createToken, verifyToken, maxAge } = require(`./routes/authentication/jwsTokenization`);

const ensureAuth = (userType) => (
  (req, res) => {
    if (userType === req.userType) {
      next();
    } else {
      console.log(userType)
      if (userType === 'qs-admin') {
        res.redirect('/qsadminsignin');
      } else {
        res.redirect('/signin');
      }
    }
  }
);

// general routes everyone has access to:
router.use("/qsadminsignin", express.static("front-end/build"));
router.use("/", express.static("front-end/build"));
router.use("/signin", express.static("front-end/build"));
router.use("/signup", express.static("front-end/build"));

router.use("/qsadminhomepage", async (req, res) => {
  try{
    const token = req.cookies.qsUser;
    const decodedToken = await verifyToken(token);
    req.userType = decodedToken.type;
    const newToken = createToken(decodedToken.id, decodedToken.username, decodedToken.type);
    res.cookie('qsUser', newToken, { httpOnly: true, maxAge: maxAge * 1000 });
    next();
  } catch (err) {
    res.redirect('/qsadminsignin');
  }
});

router.use("/qsadminhomepage", ensureAuth('qs-admin'), express.static("front-end/build"));

router.use(async (req, res) => {
  try{
    const token = req.cookies.qsUser;
    const decodedToken = await verifyToken(token);
    req.userType = decodedToken.type;
    const newToken = createToken(decodedToken.id, decodedToken.username, decodedToken.type);
    res.cookie('qsUser', newToken, { httpOnly: true, maxAge: maxAge * 1000 });
    next();
  } catch (err) {
    res.redirect('/signin');
  }
});

router.use("/participanthomepage", ensureAuth('participant'), express.static("front-end/build"));
router.use("/searchresults", ensureAuth('participant'), express.static("front-end/build"));
router.use("/popularquests", ensureAuth('participant'), express.static("front-end/build"));
router.use("/participanthomepage/quest/:questID", ensureAuth('participant'), express.static("front-end/build"));
router.use("/participanthomepage/quest/:questID/round/:roundID", ensureAuth('participant'), express.static("front-end/build"));
router.use("/participanthomepage/quest/:questID/round/:roundID/leaderboard", ensureAuth('participant'), express.static("front-end/build"));
router.use("/participanteditprofile", ensureAuth('participant'), express.static("front-end/build"));

router.use("/hosthomepage", ensureAuth('host'), express.static("front-end/build"));
router.use("/hosthomepage/createquest", ensureAuth('host'), express.static("front-end/build"));
router.use("/hosthomepage/quest/:questID", ensureAuth('host'), express.static("front-end/build"));
router.use("/hosthomepage/quest/:questID/round/:roundID", ensureAuth('host'), express.static("front-end/build"));
router.use("/hosteditprofile", ensureAuth('host'), express.static("front-end/build"));

router.use("/viewprofile", express.static("front-end/build"));

module.exports = router;