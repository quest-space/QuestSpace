const express = require('express');

// set up express app
const app = express();

//set up static files
app.use(express.static('public_html'));

// use parser middleware
app.use(express.json()); // Parse JSON

// initialize routes
app.use('/api', require('./routes/api'));

// error handling (from routes) middleware
app.use((err, req, res, next) => {
    console.log(err); // to see properties of message in our console
    res.status(422).send({error: err.message});
});

// listen for requests
app.listen(process.env.port || 4333, () => {
    console.log('now listening for requests');
});
