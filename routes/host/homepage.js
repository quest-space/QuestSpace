const { Router } = require (`express`);
const router = Router();

const { sendRes } = require(`../helpers/sendRes`);
const { getHostHomepageCards } = require(`../helpers/getHostHomepageCards`);

// global variables
const BAQ_REQUEST_STATUS_CODE = 400;
const CREATED_STATUS_CODE = 201;
const OK_STATUS_CODE = 200;

router.post(`/`, async (req, res) => {
    const [cards, err] = await getHostHomepageCards(req.body.username);
    if (err) {
        console.log(err);
        sendRes(res, BAQ_REQUEST_STATUS_CODE, err);
    } else {
        sendRes(res, OK_STATUS_CODE, cards);
    }
});

module.exports = router;