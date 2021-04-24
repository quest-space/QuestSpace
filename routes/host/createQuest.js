const Quest = require(`../../models/quest`);

const { handleErrorsFromDB, getQuestStatus } = require(`../helpers/helperFunctions`);
const { sendRes } = require(`../helpers/sendRes`);
const { getImgUploadURL } = require(`../helpers/imgUploadHelper`)

// global variables
const FORBIDDEN_STATUS_CODE = 403;
const BAQ_REQUEST_STATUS_CODE = 400;
const OK_STATUS_CODE = 200;

const upload = multer({ dest: __dirname + `../../../../qs-uploaded-images/` });
router.post(`/`, upload.single(`logo`), async (req, res) => {
    if (!req.file) {
        sendRes(res, BAQ_REQUEST_STATUS_CODE, {
            errors: {
                logo: {
                    message: `Logo not provided`
                }
            }
        });
        return;
    }
    try {
        // update a quest. If it does not exit, create a new one.
        const quest = await Quest.updateOne({questName:req.body.questName}, {$set: { logoURL: `${getImgUploadURL()}${req.file.filename}`, hostUser: req.username,  
            nature: req.body.nature, description: req.body.description, about: req.body.about, 
            startTime: req.body.startTime, endTime: req.body.endTime }}, {upsert: true, runValidators: true})
        sendRes(res, OK_STATUS_CODE, quest );
    }
    catch(err){
        sendRes(res, BAQ_REQUEST_STATUS_CODE, handleErrorsFromDB(err) );
    }
  });

module.exports = router;


