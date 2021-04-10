// send a response back
const sendRes = (res, statusCode, objToSend) => {
  res.status(statusCode).json(objToSend);
  // throw new Error(`error`);
}

module.exports = { sendRes };