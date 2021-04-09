const { Router } = require (`express`);
const router = Router();

router.use(`/signout`, require(`../authentication/signOutAPI`));

router.use(`/homepage`, require(`./homepage-home`));

router.use(`/quest`, require(`./quest-details`));
 
  // nature: private -> requestor must be enrolled
  // nature: public -> requestor must be enrolled if it is a live or past quest

  /* If private, enrolled = 1
    If public, either enrolled or not enrolled. If not enrolled, enrolled = 0
    If enrolled == 1, go to details page
    Else, go to quest enrollment page
  */
  
module.exports = router;