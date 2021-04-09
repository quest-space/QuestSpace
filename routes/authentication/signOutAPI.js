const { Router } = require (`express`);
const router = Router();

// log out user
router.post(`/`, async (req, res) => {
  res.cookie(`qsUser`, ``, { maxAge: 1 });
});

module.exports = router;