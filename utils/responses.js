const utils = require('../utils/utils');

const validateOtp = (payload,avatarPath,accessToken,refreshToken)=>{
    return {
            status : utils.STATUS_TEXT.SUCCESS,
            data  :  {
                ...payload ,
                avatar : avatarPath
            },
            code  :  utils.HTTP_STATUS.CREATED  ,
            accessToken : accessToken ,
            refreshToken : refreshToken,
        }
}


const registration = (otpId,newUser)=>{
    return {
            status : utils.STATUS_TEXT.SUCCESS,
            data : 
                {
                    otpId : otpId,
                    userData : newUser
                },
            code :  utils.HTTP_STATUS.CREATED
        }
}

module.exports = { 
    validateOtp,
    registration
}