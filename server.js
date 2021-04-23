const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require(`cookie-parser`);
const cors = require(`cors`);

// port to listen at
const PORT = 4333;

// DB vars:
const DB_URL = `mongodb://localhost:27017`;
const DB_NAME = `testDBTalha`;

const Rating = require(`./models/ratings`);

// set up express app
const app = express();

app.use(cors({ origin: true, credentials: true }));
//app.use((req, res, next) => {
//  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type");
//  res.header("Access-Control-Allow-Credentials", true);
//  next();
//});
app.use(`/uploaded-file`, express.static("../qs-uploaded-files"));
app.use(`/uploaded-img`, express.static("../qs-uploaded-images"));

app.use(require('./front-end/front-end-routes'));

// use parser middleware
app.use(express.json()); // Parse JSON
app.use(cookieParser()); // Parse Cookies

// initialize routes
app.use('/api', require('./routes/mainRouter'));

// test routes
app.use(`/apitest`, require(`./routes/testRouter`));

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
