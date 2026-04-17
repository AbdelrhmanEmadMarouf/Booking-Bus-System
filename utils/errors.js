const appError = require('./appError');
const utils = require('./utils');

const WRONG_OTP_ERROR = appError.create(
            utils.MESSAGES.WROG_OTP_VALIDATION,
            utils.STATUS_TEXT.FAIL,
            utils.HTTP_STATUS.NOT_FOUND
        )

const INTERNAL_SERVER_ERROR = (err)=>{ 
    
    return appError.create(
            err.message,
            utils.STATUS_TEXT.FAIL,
            utils.HTTP_STATUS.INTERNAL_SERVER_ERROR
    )
}




module.exports = {
    WRONG_OTP_ERROR,
    INTERNAL_SERVER_ERROR
}