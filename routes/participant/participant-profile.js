const { Router } = require (`express`);
const Participant = require(`../../models/participant`);

const router = Router();

// global variables
const BAQ_REQUEST_STATUS_CODE = 400;
const CREATED_STATUS_CODE = 201;
const OK_STATUS_CODE = 200;

const shortDate = (date) => {
    const splitted = date.toDateString().split(' ')
    return (splitted[2] + '-' + splitted[1] + '-' + splitted[3]) 
};

const { handleErrorsFromDB } = require(`../helpers/helperFunctions`);
const { sendRes } = require(`../helpers/sendRes`);

router.post(`/`, async (req, res) => {
    try{
        const userData = await Participant.findOne({username: req.body.username}); 
        const to_send = {
            username: userData.username,
            password: userData.password,
            fullname:  userData.firstname + ' ' + userData.lastname,
            firstname: userData.firstname,
            lastname: userData.lastname,
            dateofbirth: shortDate(userData.dateofbirth),
            organization: userData.organization
        }
        sendRes(res, OK_STATUS_CODE, to_send);
    }
    catch(err){
        sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err));
    }
    
});

module.exports = router;