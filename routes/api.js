const { Router } = require (`express`);
const router = Router();

// routes API requests to different files
router.use(`/auth`, require(`./auth`));
router.use(`homepage`, require(`./homepage-home`));

// Filters authenticated users and refreshes their authentication:
router.use(require(`./authenticateUser`));
// An authenticated user is who
// 1. routes at /api/participant or /api/host
// 2. has a token in cookie
// 3. token is valid
// 4. if token is for participant, it is routing to /api/participant, and if it is
//    host, it is routing to /api/host

// get a list of ninjas from the db
router.get(`/participant/test`, (req, res, next) => {
    res.send({
        request_type: `GET`,
        body: req.body,
        data_recieved: req.query
    })
});

// get a list of ninjas from the db
router.get(`/host/test`, (req, res, next) => {
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