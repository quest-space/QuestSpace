const { Router } = require (`express`);
const Host = require(`../../models/host`);
const bcrypt = require('bcrypt');

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

router.post(`/submit`, async (req, res) => {
    try{
        const password = req.body.password;
        const passwordlength = password.length;
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(password, salt);

        const editable = await Host.updateOne({username: req.body.username}, {$set: {  password: hashed, phone: req.body.phone, representativeName: req.body.representativeName,
            representativeDesignation: req.body.representativeDesignation,organization: req.body.organization, passwordlength: passwordlength}}, {upsert: true})

        sendRes(res, OK_STATUS_CODE, editable);
    }
    catch(err){
        sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err));
    }   
});

router.post(`/edit`, async (req, res) => {
    try{
        const userData = await Host.findOne({username: req.body.username}); 
        const to_send = {
            username: userData.username,
            password: userData.password,
            phone: userData.phone,
            representativeName: userData.representativeName,
            representativeDesignation: userData.representativeDesignation,
            rating: userData.rating,
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
        const userData = await Host.findOne({username: req.body.username}); 
        const to_send = {
            username: userData.username,
            password: userData.password,
            phone: userData.phone,
            representativeName: userData.representativeName,
            representativeDesignation: userData.representativeDesignation,
            rating: userData.rating,
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