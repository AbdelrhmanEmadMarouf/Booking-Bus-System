const utils = require('../utils/utils');

const validateOtp = (payload,avatarPath,accessToken,refreshToken,res)=>{

    return res.status(utils.HTTP_STATUS.CREATED)
    .json({
            status : utils.STATUS_TEXT.SUCCESS,
            data  :  {
                ...payload ,
                avatar : avatarPath
            },
            code  :  utils.HTTP_STATUS.CREATED  ,
            accessToken : accessToken ,
            refreshToken : refreshToken,
        })
}

const registration = (otpId,newUser,res)=>{
    return res.status(utils.HTTP_STATUS.CREATED)
    .json({
            status : utils.STATUS_TEXT.SUCCESS,
            data : 
                {
                    otpId : otpId,
                    userData : newUser
                },
            code :  utils.HTTP_STATUS.CREATED
        })
}

const loginSuccessful = (accessToken,refreshToken,res)=>{
    return res
        .status(utils.HTTP_STATUS.OK)
        .json({
                status : utils.STATUS_TEXT.SUCCESS,
                data :  {
                    accessToken : accessToken,
                    refreshToken : refreshToken
                },
                code :  utils.HTTP_STATUS.OK
        })
}

const loginFaild = (res)=>{
    return res.status(utils.HTTP_STATUS.UNAUTHORIZED)
            .json({
                status : utils.STATUS_TEXT.FAIL,
                data :  {
                    accessToken : null
                },
                message : utils.MESSAGES.WRONG_PASSWORD,
                code :  utils.HTTP_STATUS.UNAUTHORIZED
        })
}

const refreshToken = (res,newAccessToken) =>{
    return res.status(utils.HTTP_STATUS.OK)
    .json({
            status : utils.STATUS_TEXT.SUCCESS,
            data :  {
                accessToken : newAccessToken,
            },
            code :  utils.HTTP_STATUS.OK
    })
}

const tokenNotFound = (res) =>{
        return  res.status(utils.HTTP_STATUS.UNAUTHORIZED)
            .json({
                    status : utils.STATUS_TEXT.FAIL,
                    data :  {
                        accessToken : null
                    },
                    message : utils.MESSAGES.REQUIRED_TOKEN,
                    code :  utils.HTTP_STATUS.UNAUTHORIZED
            })
}


const invalidToken = (res,err) =>{
    return  res.status(utils.HTTP_STATUS.UNAUTHORIZED)
                .json({
                        status : utils.STATUS_TEXT.FAIL,
                        data :  {
                            accessToken : null
                        },
                        message : err.message,
                        code :  utils.HTTP_STATUS.UNAUTHORIZED
                })
}

const invalidUser = (res,err) =>{
    return  res.status(utils.HTTP_STATUS.FORBIDDEN)
                    .json({
                            status : utils.STATUS_TEXT.FAIL,
                            data :  {
                                accessToken : null
                            },
                            message : utils.MESSAGES.YOU_ARE_NOT_ALLOW,
                            code :  utils.HTTP_STATUS.FORBIDDEN
                    })
}


const successful = (res,data)=>{
    return res
        .status(utils.HTTP_STATUS.OK)
        .json({
                status : utils.STATUS_TEXT.SUCCESS,
                data ,
                code :  utils.HTTP_STATUS.OK
        })
}



module.exports = { 
    validateOtp,
    registration,
    loginSuccessful,
    loginFaild,
    refreshToken,
    tokenNotFound,
    invalidToken,
    invalidUser,
    successful
}