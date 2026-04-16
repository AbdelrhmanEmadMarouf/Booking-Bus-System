const  validator = require('validator');
const appError = require('../utils/appError');
const utils = require('../utils/utils');

const validateEmailFormat = (email) => {
    if (!validator.isEmail(email)) {
        throw appError.create(
            utils.MESSAGES.WRONG_EMAIL_FORMAT,
            utils.STATUS_TEXT.FAIL,
            utils.HTTP_STATUS.BAD_REQUEST
        );
    }
};




module.exports = {
    validateEmailFormat
}