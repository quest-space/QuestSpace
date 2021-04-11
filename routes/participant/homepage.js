const { Router } = require (`express`);
const Participant = require(`../../models/participant`);
const Quest = require(`../../models/quest`);
const Host = require(`../../models/host`);
const Rating = require(`../../models/ratings`);
const Participation = require(`../../models/participation`);

const router = Router();

const { sendRes } = require(`../helpers/sendRes`);
const { getParticipantHomepageCards } = require(`../helpers/getParticipantHomepageCards`);

// global variables
const BAQ_REQUEST_STATUS_CODE = 400;
const CREATED_STATUS_CODE = 201;
const OK_STATUS_CODE = 200;

// Session cookies will already be stored. Fetch username from there.
let username = 'HassaanAW';

router.post(`/`, async (req, res) => {
    const [cards, err] = await getParticipantHomepageCards(req.body.username);
    if (err) {
        console.log(err);
        sendRes(res, BAQ_REQUEST_STATUS_CODE, err);
    } else {
        sendRes(res, OK_STATUS_CODE, cards);
    }
});

module.exports = router;