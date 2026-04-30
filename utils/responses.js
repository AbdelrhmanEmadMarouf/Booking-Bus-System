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

const userIsNotDriver = (res)=>{
    return res
        .status(utils.HTTP_STATUS.BAD_REQUEST)
        .json({
                status : utils.STATUS_TEXT.FAIL,
                message : utils.MESSAGES.USER_IS_NOT_DRIVER ,
                code :  utils.HTTP_STATUS.BAD_REQUEST
        })
}

const invalidTripTime = (res)=>{
    return res
        .status(utils.HTTP_STATUS.BAD_REQUEST)
        .json({
                status : utils.STATUS_TEXT.FAIL,
                message : utils.MESSAGES.INVALID_TRIP_TIME ,
                code :  utils.HTTP_STATUS.BAD_REQUEST
        })
}

const driverIsNotFree = (res)=>{
        return res
        .status(utils.HTTP_STATUS.CONFLICT)
        .json({
                status : utils.STATUS_TEXT.FAIL,
                message : utils.MESSAGES.DRIVER_IS_NOT_FREE ,
                code :  utils.HTTP_STATUS.CONFLICT
        })
}

const busIsNotFree = (res)=>{
        return res
        .status(utils.HTTP_STATUS.CONFLICT)
        .json({
                status : utils.STATUS_TEXT.FAIL,
                message : utils.MESSAGES.BUS_IS_NOT_FREE ,
                code :  utils.HTTP_STATUS.CONFLICT
        })
}
const tripNotExist = (res)=>{
        return res
        .status(utils.HTTP_STATUS.NOT_FOUND)
        .json({
                status : utils.STATUS_TEXT.FAIL,
                message : utils.MESSAGES.TRIP_NOT_EXIST ,
                code :  utils.HTTP_STATUS.NOT_FOUND
        })
}

const seatNotFree = (res)=>{
        return res
        .status(utils.HTTP_STATUS.BAD_REQUEST)
        .json({
                status : utils.STATUS_TEXT.FAIL,
                message : utils.MESSAGES.SEAT_NOT_FREE ,
                code :  utils.HTTP_STATUS.BAD_REQUEST
        })
}

const notEnoughBalance = (res)=>{
        return res
        .status(utils.HTTP_STATUS.BAD_REQUEST)
        .json({
                status : utils.STATUS_TEXT.FAIL,
                message : utils.MESSAGES.NOT_ENOUGH_BALANCE ,
                code :  utils.HTTP_STATUS.BAD_REQUEST
        })
}
const UserBookedTripAlready = (res)=>{
        return res
        .status(utils.HTTP_STATUS.BAD_REQUEST)
        .json({
                status : utils.STATUS_TEXT.FAIL,
                message : utils.MESSAGES.USER_BOOKED_TRIP_ALREADY ,
                code :  utils.HTTP_STATUS.BAD_REQUEST
        })
}
const userNotExist = (res)=>{
        return res
        .status(utils.HTTP_STATUS.NOT_FOUND)
        .json({
                status : utils.STATUS_TEXT.FAIL,
                message : utils.MESSAGES.USER_NOT_FOUND ,
                code :  utils.HTTP_STATUS.NOT_FOUND
        })
}
const DriverNotExist = (res)=>{
        return res
        .status(utils.HTTP_STATUS.NOT_FOUND)
        .json({
                status : utils.STATUS_TEXT.FAIL,
                message : utils.MESSAGES.DRIVER_NOT_FOUND ,
                code :  utils.HTTP_STATUS.NOT_FOUND
        })
}
const userIsNotPassenger = (res)=>{
        return res
        .status(utils.HTTP_STATUS.BAD_REQUEST)
        .json({
                status : utils.STATUS_TEXT.FAIL,
                message : utils.MESSAGES.USER_NOT_PASSENGER ,
                code :  utils.HTTP_STATUS.BAD_REQUEST
        })
}
const endTrip = (res)=>{
        return res
        .status(utils.HTTP_STATUS.ACCEPTED)
        .json({
                status : utils.STATUS_TEXT.SUCCESS,
                message : utils.MESSAGES.TRIP_DELETED ,
                code :  utils.HTTP_STATUS.ACCEPTED
        })
}
const notTripDriver = (res)=>{
        return res
        .status(utils.HTTP_STATUS.BAD_REQUEST)
        .json({
                status : utils.STATUS_TEXT.FAIL,
                message : utils.MESSAGES.NOT_TRIP_DRIVER ,
                code :  utils.HTTP_STATUS.BAD_REQUEST
        })
}
const emailAlreadyExist = (res)=>{
        return res
        .status(utils.HTTP_STATUS.BAD_REQUEST)
        .json({
                status : utils.STATUS_TEXT.FAIL,
                message : utils.MESSAGES.EMAIL_IS_ALREADY_EXIST ,
                code :  utils.HTTP_STATUS.BAD_REQUEST
        })
}
const phoneAlreadyExist = (res)=>{
        return res
        .status(utils.HTTP_STATUS.BAD_REQUEST)
        .json({
                status : utils.STATUS_TEXT.FAIL,
                message : utils.MESSAGES.PHONE_IS_ALREADY_EXIST ,
                code :  utils.HTTP_STATUS.BAD_REQUEST
        })
}
const LlicenseNumberAlreadyExist = (res)=>{
        return res
        .status(utils.HTTP_STATUS.BAD_REQUEST)
        .json({
                status : utils.STATUS_TEXT.FAIL,
                message : utils.MESSAGES.Llicense_Number_IS_ALREADY_EXIST ,
                code :  utils.HTTP_STATUS.BAD_REQUEST
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
        successful,
        userIsNotDriver,
        driverIsNotFree,
        busIsNotFree,
        invalidTripTime,
        tripNotExist,
        seatNotFree,
        notEnoughBalance,
        UserBookedTripAlready,
        userNotExist,
        userIsNotPassenger,
        endTrip,
        notTripDriver,
        emailAlreadyExist,
        phoneAlreadyExist,
        LlicenseNumberAlreadyExist,
        DriverNotExist
}