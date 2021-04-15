const Participant = require(`../../models/participant`);
const Quest = require(`../../models/quest`);
const Host = require(`../../models/host`);
const Rating = require(`../../models/ratings`);
const Participation = require(`../../models/participation`);
const Submission = require(`../../models/submission`);

const { handleErrorsFromDB, getQuestStatus } = require(`../helpers/helperFunctions`);
const { makeLeaderboard } = require(`../helpers/leaderboard_helper`);
const { sendRes } = require(`../helpers/sendRes`);

// global variables
const FORBIDDEN_STATUS_CODE = 403;
const BAQ_REQUEST_STATUS_CODE = 400;
const OK_STATUS_CODE = 200;

router.post(`/:questid/:roundid`, async (req, res) => {

    try{
        const ret_val = await makeLeaderboard(req.params.questid, req.params.roundid, "host", "");
        sendRes(res, OK_STATUS_CODE, ret_val );
    }
    catch(err){
        sendRes(res, BAQ_REQUEST_STATUS_CODE, err );
    }
  });

module.exports = router;


