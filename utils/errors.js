const appError = require('./appError');
const utils = require('./utils');

const WRONG_OTP_ERROR = appError.create(
            utils.MESSAGES.WROG_OTP_VALIDATION,
            utils.STATUS_TEXT.FAIL,
            utils.HTTP_STATUS.NOT_FOUND
        )

const WRONG_EMAIL_FORMAT = appError.create(
            utils.MESSAGES.WRONG_EMAIL_FORMAT,
            utils.STATUS_TEXT.FAIL,
            utils.HTTP_STATUS.BAD_REQUEST
        );

const EMAIL_NOT_FOUND_ERROR = appError.create(
            utils.MESSAGES.REQUIRED_EMAIL,
            utils.STATUS_TEXT.FAIL,
            utils.HTTP_STATUS.BAD_REQUEST
        )

const USER_NOT_FOUND_ERROR = appError.create(
            utils.MESSAGES.USER_NOT_FOUND,
            utils.STATUS_TEXT.FAIL,
            utils.HTTP_STATUS.NOT_FOUND
        )

const PASSWORD_NOT_FOUND_ERROR = appError.create(
            utils.MESSAGES.REQUIRED_PASSWORD,
            utils.STATUS_TEXT.FAIL,
            utils.HTTP_STATUS.BAD_REQUEST
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
    INTERNAL_SERVER_ERROR,
    WRONG_EMAIL_FORMAT,
    EMAIL_NOT_FOUND_ERROR,
    PASSWORD_NOT_FOUND_ERROR,
    USER_NOT_FOUND_ERROR
}