const express = require('express');

const mongoose = require('mongoose')
// autoIncrement = require('mongoose-auto-increment') // To auto-increment

// const mongoDB = 'mongodb://localhost/QuestSpace'
// mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true})
// const db = mongoose.connection
// db.on('error', console.error.bind(console, 'MongoDB connection error:'))
// db.once('open', function() { console.log('Database has been connected') })

// autoIncrement.initialize(mongoose.connection);

// set up express app
const app = express();

app.use(require('./front-end/front-end-routes'));

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
