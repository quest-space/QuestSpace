const { Router } = require (`express`);
const Participant = require(`../../models/participant`);
const bcrypt = require('bcrypt');

const router = Router();

// global variables
const BAQ_REQUEST_STATUS_CODE = 400;
const CREATED_STATUS_CODE = 201;
const OK_STATUS_CODE = 200;

const shortDate = (date) => {
    const splitted = date.toDateString().split(' ')
    return (splitted[3] + '-' + splitted[1] + '-' + splitted[2]) 
};

const formattedDate = (date) => {
    const months = {
        'Jan' : '01',
        'Feb' : '02',
        'Mar' : '03',
        'Apr' : '04',
        'May' : '05',
        'Jun' : '06',
        'Jul' : '07',
        'Aug' : '08',
        'Sep' : '09',
        'Oct' : '10',
        'Nov' : '11',
        'Dec' : '12'
    }
    const splitted = date.toDateString().split(' ')
    return (splitted[3] + '-' + months[splitted[1]] + '-' + splitted[2]) 
};

const { handleErrorsFromDB } = require(`../helpers/helperFunctions`);
const { sendRes } = require(`../helpers/sendRes`);

router.post(`/submit`, async (req, res) => {
    try{

        const profile = await Participant.findOne({username: req.body.username});
        const prevpassword = profile.password;

        if(prevpassword!= req.body.password){
            const password = req.body.password;
            const passwordlength = password.length;
            const salt = await bcrypt.genSalt();
            const hashed = await bcrypt.hash(password, salt);

            const editable = await Participant.updateOne({username: req.body.username}, {$set: {  password: hashed,  
            firstname: req.body.firstname, lastname: req.body.lastname, dateofbirth: req.body.dateofbirth, organization: req.body.organization, passwordlength: passwordlength}}, 
            {upsert: true})
            sendRes(res, OK_STATUS_CODE, editable);
        }
        else{
            const hashed = prevpassword;
            const passwordlength = profile.passwordlength;

            const editable = await Participant.updateOne({username: req.body.username}, {$set: {  password: hashed,  
            firstname: req.body.firstname, lastname: req.body.lastname, dateofbirth: req.body.dateofbirth, organization: req.body.organization, passwordlength: passwordlength}}, 
            {upsert: true})
            sendRes(res, OK_STATUS_CODE, editable);
        }

        
    }
    catch(err){
        sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err));
    }   
});

router.post(`/edit`, async (req, res) => {
    try{
        const userData = await Participant.findOne({username: req.body.username}); 
        const to_send = {
            username: userData.username,
            password: userData.password,
            fullname:  userData.firstname + ' ' + userData.lastname,
            firstname: userData.firstname,
            lastname: userData.lastname,
            dateofbirth: shortDate(userData.dateofbirth),
            formatteddob: formattedDate(userData.dateofbirth),
            organization: userData.organization,
            passwordlength: userData.passwordlength
        }
        sendRes(res, OK_STATUS_CODE, to_send);
    }
    catch(err){
        sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err));
    }
    
});

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
            formatteddob: formattedDate(userData.dateofbirth),
            organization: userData.organization,
            passwordlength: userData.passwordlength
        }
        sendRes(res, OK_STATUS_CODE, to_send);
    }
    catch(err){
        sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err));
    }
    
});

module.exports = router;