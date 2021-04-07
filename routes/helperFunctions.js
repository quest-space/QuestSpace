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
    Object.values(err.errors).forEach(({ properties }) => {
      errMsg[`errors`][properties.path] = { 
        message: properties.message,
        valueReceived: properties.value
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

module.exports.handleErrorsFromDB = handleErrorsFromDB;
module.exports.getMissingParamsErr = getMissingParamsErr;