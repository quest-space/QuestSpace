const { Router } = require (`express`);
const router = Router();

const { sendRes } = require(`../helpers/sendRes`);

const OK_STATUS_CODE = 200;

// log out user
router.post(`/`, async (req, res) => {
  res.cookie(`qsUser`, ``, { httpOnly: true, maxAge: 1 });
  sendRes(res, OK_STATUS_CODE, {});
});

module.exports = router;