const asyncWrapper = require('../middleware/asyncWrapper');
const generateJWT = require('../utils/generateJWT');
const sendOPT = require('../utils/senOTP');
const DB_auth = require('../DB/Queries/auth/DB.auth');
const DB_USER = require('../DB/Queries/users/DB.users');
const validation = require('../utils/validations');
const response = require('../utils/responses');
const {userRoles} = require('../utils/userRoles');
const {generateRefreshToken} = require('../utils/generateRefreshToken');

const registration = asyncWrapper(async(req,res,next)=>{

    req.body.role = userRoles.PASSENGER;
    const newUser = req.body;

    validation.validateEmailFormat(newUser.email);

    if(await validation.isEmailAlreadyExist(newUser.email)){
    return response.emailAlreadyExist(res);
    }

    if(await validation.isPhoneAlreadyExist(newUser.phone)){
    return  response.phoneAlreadyExist(res);
    }




    const otp = await sendOPT(newUser);
    await  DB_auth.insertOtp(otp);
    const otpdata = await DB_auth.getOtpData(otp);
    return response.registration(otpdata,newUser,res);

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
        let user = await DB_USER.getUserByEmail(req.body.email);

        let payload = {
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role,
            user_id: user.user_id,
            phone: user.phone
        };

        const refreshToken = generateRefreshToken(payload);

        await DB_auth.updateRefteshToken(validationResult.data,refreshToken);
        return response.loginSuccessful(accessToken,refreshToken,res)

        }

        return  response.loginFaild(res);


})

const refreshTokenHandler = asyncWrapper(async(req,res,next)=>{

const userData = {
        email: req.currentUser.email,
        first_name: req.currentUser.first_name,
        last_name: req.currentUser.last_name,
        password:req.currentUser.password,
        role: req.currentUser.role,
        id: req.currentUser.id
    }
const newAccessToken = generateJWT(userData);
return  response.refreshToken(res,newAccessToken);

    })





module.exports = {
    refreshTokenHandler,
    login,
    registration,
    validateOTP
}