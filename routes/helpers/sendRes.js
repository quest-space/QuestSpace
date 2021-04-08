// send a response back
const sendRes = (res, statusCode, objToSend) => {
  res.status(statusCode).json(objToSend);
}

module.exports = { sendRes };