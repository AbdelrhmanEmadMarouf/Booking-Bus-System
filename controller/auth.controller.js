const asyncWrapper = require('../middleware/asyncWrapper');
const generateAccessToken = require('../utils/generateJWT');
const utils = require('../utils/utils');
const {sql} = require('../DB/config');
const appError = require('../utils/appError');
const bcrypt = require('bcrypt');
const generateJWT = require('../utils/generateJWT');
const {generateRefreshToken} = require('../utils/generateRefreshToken');
const  validator = require('validator');
const sendOPT = require('../utils/senOTP');
const fs = require('fs');
const DB_auth = require('../DB/Queries/auth/DB.auth');
const {validateEmailFormat} = require('../utils/validations');


const registration = asyncWrapper(async(req,res,next)=>{

    const newUser = req.body;

    validateEmailFormat(newUser.email);

    const otp = await sendOPT(newUser);

    await  DB_auth.insertOtp(otp);

    const otpId = await DB_auth.getOtpId(otp);


    res
    .status(utils.HTTP_STATUS.CREATED)
    .json({
        status : utils.STATUS_TEXT.SUCCESS,
        data : 
            {
                otpId : otpId,
                userData : newUser
            },
        code :  utils.HTTP_STATUS.CREATED
    });


});


module.exports = {
   // refreshTokenHandler,
   // login,
    registration
   // validateOTP
}