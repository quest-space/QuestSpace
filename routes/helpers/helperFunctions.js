const formatAMPM = (date) => {
  date = new Date(date.getTime() + (5 * 60 * 60 * 1000));
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+ minutes : minutes;
  const strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime + ', ' + date.toDateString() + ' PK Time';
}

const getConciseDate = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+ minutes : minutes;
  const strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime + ', ' + date.toDateString().split(` `).slice(1,3).join(` `);
}

const getQuestStatus = (startTime, endTime, currTime) => {
  if (startTime.getTime() <= currTime && endTime.getTime() > currTime) {
    return `Live`;
  } else if (startTime.getTime() > currTime) {
    return `Upcoming`;
  } else {
    return `Past`;
  }
}

// checks if req has all params
const getMissingParamsErr = (reqObj, params) => {
  const paramsNotInReq = params.filter((param) => !(param in reqObj));
  if (paramsNotInReq.length) {
    const objToSend = {
      errors: {}
    };
    paramsNotInReq.forEach((param) => {
      objToSend[`errors`][param] = {
        message: `This param was required, but was not included.`
      }
    })
    return objToSend;
  }
}

const handleDuplicationError = (error) => {
  if (error.name === `MongoError` && error.code === 11000) {
    const errorField = Object.keys(error.keyValue)[0];
    const fieldVal = error.keyValue[errorField];
    const errObj = {
      errors: {}
    };
    errObj['errors'][errorField] = {
      message: `Already exists`,
      valueReceived: fieldVal
    };
    return errObj;
  }
}
  
const parseDBError = (err) => {
  const errMsg = {
    errors: {}
  }
  // validation errors
  if (err.message.includes('validation failed')) {
    Object.keys(err.errors).forEach((field) => {
      try {
        errMsg[`errors`][field] = { 
          message: err.errors[field].message,
          valueReceived: err.errors[field].value
        }
      } catch (e) {
        errMsg[`genericErrMsg`] = err.message;
      }
    });
  } else if (err.message.includes(`frd234sf,`)) {
    const errMsgTokens = err.message.split(`,`);
    errMsg[`errors`][errMsgTokens[1]] = { 
      message: errMsgTokens[2],
      valueReceived: errMsgTokens[3]
    }
  } else {
    errMsg[`genericErrMsg`] = err.message;
  }
  return errMsg;
}

const handleErrorsFromDB = (err) => {
  const duplicationErr = handleDuplicationError(err);
  return duplicationErr ? duplicationErr : parseDBError(err);
}

module.exports = { handleErrorsFromDB, getMissingParamsErr, getQuestStatus, formatAMPM, getConciseDate };