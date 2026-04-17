const asyncWrapper = require('../middleware/asyncWrapper');
const generateJWT = require('../utils/generateJWT');
const sendOPT = require('../utils/senOTP');
const DB_auth = require('../DB/Queries/auth/DB.auth');
const {validateEmailFormat} = require('../utils/validations');
const response = require('../utils/responses');


const registration = asyncWrapper(async(req,res,next)=>{

    const newUser = req.body;
    validateEmailFormat(newUser.email);
    const otp = await sendOPT(newUser);
    await  DB_auth.insertOtp(otp);
    const otpId = await DB_auth.getOtpId(otp);

    res.json(response.registration(otpId,newUser));
});

const validateOTP = asyncWrapper(async(req,res,next)=>{

const otpId = req.body.otpId; 
const otp = req.body.otp; 

await DB_auth.validateOTP(otp,otpId,req);
await DB_auth.insertUser(req);
const tokensData = await DB_auth.insertRefreshToken(req);
await DB_auth.deleteOTP(otpId);

const accessToken =  generateJWT(tokensData.payload);

    res.json(response.validateOtp(tokensData.payload,req.avatarPath,accessToken,tokensData.refreshToken))

})



module.exports = {
   // refreshTokenHandler,
   // login,
    registration,
    validateOTP
}