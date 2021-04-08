const jwt = require(`jsonwebtoken`);

// secret key
const ACCESS_TOKEN_SECRET = `d18548bafc962592dc6c25cfdcb67ef974a4a217c612049501d9481f999ea747b9c2cd764389b6742a990d265a0651c6a9043f049637be03187b4a8154f71d1e`

// max age of token
const maxAge = 60 * 20; // 20 minutes

// create json web token
const createToken = (id, username, type) => {
  return jwt.sign({ id, username, type }, ACCESS_TOKEN_SECRET, { expiresIn: maxAge });
};

const verifyToken = (token) => 
  new Promise((resolve, reject) => {
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        reject(err);
      } else {
        resolve(decodedToken);
      }
    });
  });

module.exports = { createToken, verifyToken, maxAge };