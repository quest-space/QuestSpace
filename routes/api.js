const { Router } = require (`express`);
const router = Router();

// routes API requests to different files
router.use(`/auth`, require(`./auth`));

router.use(require(`./authenticateUser`));

// get a list of ninjas from the db
router.get(`/test`, (req, res, next) => {
    res.send({
        request_type: `GET`,
        body: req.body,
        data_recieved: req.query
    })
});

// add a new ninja to the db
router.post(`/test`, (req, res, next) => {
    res.send({
        request_type: `POST`,
        data_recieved: req.body
    })
});

// update a ninja in the db
router.put(`/test/:id`, (req, res, next) => {
    res.send({
        request_type: `PUT`,
        data_recieved: req.params
    })
});

// delete a ninja from the db
router.delete(`/test/:id`, (req, res, next) => {
    res.send({
        request_type: `DELETE`,
        data_recieved: req.params
    })
});

module.exports = router;