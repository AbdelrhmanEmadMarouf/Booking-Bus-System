const asyncWrapper = require('../middleware/asyncWrapper');
const generateJWT = require('../utils/generateJWT');
const {generateRefreshToken} = require('../utils/generateRefreshToken');
const sendOPT = require('../utils/senOTP');
const DB_auth = require('../DB/Queries/auth/DB.auth');
const validation = require('../utils/validations');
const response = require('../utils/responses');


const registration = asyncWrapper(async(req,res,next)=>{

    const newUser = req.body;
    validation.validateEmailFormat(newUser.email);
    const otp = await sendOPT(newUser);
    await  DB_auth.insertOtp(otp);
    const otpId = await DB_auth.getOtpId(otp);
    return response.registration(otpId,newUser,res);

});

const validateOTP = asyncWrapper(async(req,res,next)=>{

const otpId = req.body.otpId; 
const otp = req.body.otp; 

await validation.validateOTP(otp,otpId,req);
await DB_auth.insertUser(req);
const tokensData = await DB_auth.insertRefreshToken(req);
await DB_auth.deleteOTP(otpId);

const accessToken =  generateJWT(tokensData.payload);

return response.validateOtp(tokensData.payload,req.avatarPath,accessToken,tokensData.refreshToken,res)

})


const login = asyncWrapper(async(req,res,next)=>{

validation.isEmailExist(req.body.email);
validation.isPasswoedExist(req.body.password);
const validationResult = await validation.loginValidation(req.body.email,req.body.password);

if(validationResult.loginStatus){

        const accessToken =  generateJWT(validationResult.data);
        const refreshToken = generateRefreshToken(validationResult.data);
        await DB_auth.updateRefteshToken(validationResult.data,refreshToken);
        return response.loginSuccessful(accessToken,refreshToken,res)

        }

        return  response.loginFaild(res);


})




module.exports = {
   // refreshTokenHandler,
    login,
    registration,
    validateOTP
}