const express = require ('express');
const router = express.Router();

// get a list of ninjas from the db
router.get('/test', (req, res, next) => {
    res.send({
        request_type: 'GET',
        data_recieved: req.query
    })
});

// add a new ninja to the db
router.post('/test', (req, res, next) => {
    res.send({
        request_type: 'POST',
        data_recieved: req.body
    })
});

// update a ninja in the db
router.put('/test/:id', (req, res, next) => {
    res.send({
        request_type: 'PUT',
        data_recieved: req.params
    })
});

// delete a ninja from the db
router.delete('/test/:id', (req, res, next) => {
    res.send({
        request_type: 'DELETE',
        data_recieved: req.params
    })
});

module.exports = router;