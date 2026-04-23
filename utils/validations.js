const  validator = require('validator');
const errors = require('./errors');
const DB_auth = require('../DB/Queries/auth/DB.auth');
const bcrypt = require('bcrypt');
const fs = require('fs');

const validateEmailFormat = (email) => {
    if (!validator.isEmail(email)) {
        throw errors.WRONG_EMAIL_FORMAT
    }
};

const isEmailExist = (email)=>{
        if(!email){
        throw errors.EMAIL_NOT_FOUND_ERROR
        }

}

const isPasswoedExist = (password)=>{
        if(!password){
        throw errors.PASSWORD_NOT_FOUND_ERROR
        }
}

const loginValidation = async(email,password)=>{


const user = await DB_auth.getUserByEmail(email);


    if(!user){
        throw errors.USER_NOT_FOUND_ERROR
    }

    const dbHashedPassword = user.password;

    //login password after hashing to matching it with the password that in DB
    //* if the two password are matched ==> return true else return false
    const loginStatus =  await bcrypt.compare(password, dbHashedPassword);

    return {
        data : {
            email : user.email ,
            first_name :user.first_name ,
            last_name : user.last_name,
            role : user.role,
            id : user.user_id
        },
        loginStatus
    };


}

const validateOTP = async(otp,otpId,req)=>{

    const result = await DB_auth.validateOTP(otp,otpId);


    if(result.length === 0){

    /*
    1- the file is already uploaded into the server 
    2- here the validation of the otp is faild so we deleted this file from the 
        server 
    */
    if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
    }
        throw errors.WRONG_OTP_ERROR;
    }

    const now = new Date();
    const createdTime = new Date(result.created_at);
    const expiryTime = new Date(createdTime.getTime() + result.expiration_time * 60000);
    

    if (now > expiryTime) {

        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        throw errors.EXPIRED_OTP_ERROR;
    }

    return true;


}





module.exports = {
    validateEmailFormat,
    isEmailExist,
    isPasswoedExist,
    loginValidation,
    validateOTP
}