const Rating = require(`../../models/ratings`);
const Host = require(`../../models/host`);

const updateHostRating = (hostUser) => 
  new Promise(async (resolve, reject) => {
    try {
      const ratings = (await Rating.find({ hostUser : `hostRatingWala1` }));
      console.log({ratings});
      console.log(`---`);
      const newRating = Math.round(ratings.reduce((acc, currRating) => acc + currRating.score, 0) / ratings.length);
      console.log({newRating});
      console.log(`---`);
      const u = await Host.updateOne({ username: `hostRatingWala1` }, { rating: newRating });
      console.log({u});
      console.log(`---`);
      resolve();
    } catch (err) {
      reject(err);
    }
  });

module.exports = { updateHostRating };