const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require(`cookie-parser`);

// port to listen at
const PORT = 4333;

// DB vars:
const DB_URL = `mongodb://localhost:8000`
const DB_NAME = `testDBTalha`;

const Rating = require(`./models/ratings`);

// set up express app
const app = express();

app.use(require('./front-end/front-end-routes'));

// use parser middleware
app.use(express.json()); // Parse JSON
app.use(cookieParser()); // Parse Cookies

// initialize routes
app.use('/api', require('./routes/mainRouter'));

// error handling (from routes) middleware
app.use((err, req, res, next) => {
    console.log(err); // to see properties of message in our console
    res.status(422).send({error: err.message});
});

// database connection
const dbURI = `${DB_URL}/${DB_NAME}`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then(async (result) => {
    // listen for requests
    app.listen(PORT, () => {
      console.log(`Listening for requests at port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));





  // autoIncrement = require('mongoose-auto-increment') // To auto-increment

// const mongoDB = 'mongodb://localhost/QuestSpace'
// mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true})
// const db = mongoose.connection
// db.on('error', console.error.bind(console, 'MongoDB connection error:'))
// db.once('open', function() { console.log('Database has been connected') })

// autoIncrement.initialize(mongoose.connection);