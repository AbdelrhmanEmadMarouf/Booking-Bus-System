const asyncWrapper = require('../middleware/asyncWrapper');
const DB_auth = require('../DB/Queries/auth/DB.auth');
const response = require('../utils/responses');
const generateJWT = require('../utils/generateJWT');
const {userRoles} = require('../utils/userRoles');
const validation = require('../utils/validations');


const addManger = asyncWrapper(async(req,res,next)=>{

        req.body.role = userRoles.MANGER;

        const newUser = req.body;
        validation.validateEmailFormat(newUser.email);

        if(await validation.isEmailAlreadyExist(newUser.email)){
        return response.emailAlreadyExist(res);
        }

        if(await validation.isPhoneAlreadyExist(newUser.phone)){
        return  response.phoneAlreadyExist(res);
        }


        await DB_auth.insertUser(req);
        const tokensData = await DB_auth.insertRefreshToken(req);
        const accessToken =  generateJWT(tokensData.payload);
        return response.validateOtp(tokensData.payload,req.avatarPath,accessToken,tokensData.refreshToken,res)
    
})





module.exports = {
    addManger
}