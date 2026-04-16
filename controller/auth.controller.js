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
const {test} = require('../DB/Queries/auth/auth');


const registration = asyncWrapper(async(req,res,next)=>{

    await test();

    
    res.json({
        status : utils.STATUS_TEXT.SUCCESS,
        code  :  utils.HTTP_STATUS.CREATED  ,
    })


});


module.exports = {
   // refreshTokenHandler,
   // login,
    registration
   // validateOTP
}