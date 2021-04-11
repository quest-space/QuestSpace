const mongoose = require('mongoose');

const Rating = require(`./models/ratings`);
const Host = require(`./models/host`);
const Quest = require(`./models/quest`);
const Participation = require(`./models/participation`);
const { updateHostRating } = require(`./routes/helpers/updateHostRating`);

const arr = [
  {
    participantUser: 'HassaanAW',
    questName: 'PSIFI'
  },
  {
    participantUser: 'HassaanAW',
    questName: 'Robowars'
  },
  {
    participantUser: 'HassaanAW',
    questName: 'CodinGuru'
  },
  {
    participantUser: 'HassaanAW',
    questName: 'NASA'
  },
  {
    participantUser: 'HassaanAW',
    questName: 'SpaceX'
  }
];

// DB vars:
const DB_URL = `mongodb://localhost:8000`
const DB_NAME = `testDBTalha`;

// database connection
const dbURI = `${DB_URL}/${DB_NAME}`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then(async (result) => {
    const op = await Host.updateMany( {}, {rating: 4}).exec();
    console.log(op);
    // const op = await Participation.deleteMany({ participantUser: `HassaanAW` });
    // console.log(op)
    // const op = await (Promise.all(arr.map((params) => Participation.create(params))));
    // console.log(op);
    // const op = await Quest.create({ 
    //   questName: `Cybernetics`,
    //   hostUser: `123talha`,
    //   nature: `private`,
    //   description: `nothing`,
    //   startTime: Date.now() + 10000000,
    //   endTime: Date.now() + 1000000000
    // });
    // console.log(op);
    // await Rating.create({ hostUser: `hostRatingWala2`, participantUser: `HassaanAW`, score: 5 });
    // await updateHostRating(`hostRatingWala2`);
    // try {
    //   const ratings = (await Rating.find({ hostUser : `hostRatingWala1` }));
    //   console.log({ratings});
    //   console.log(`---`);
    //   const newRating = Math.round(ratings.reduce((acc, currRating) => acc + currRating.score, 0) / ratings.length);
    //   console.log({newRating});
    //   console.log(`---`);
    //   const u = await Host.updateOne({ username: `hostRatingWala1` }, { rating: newRating });
    //   console.log({u});
    //   console.log(`---`);
    // } catch (err) {
    //   console.log(err);
    // }
  })
  .catch((err) => console.log(err));