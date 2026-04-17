const  validator = require('validator');
const errors = require('./errors');
const DB_auth = require('../DB/Queries/auth/DB.auth');
const bcrypt = require('bcrypt');

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
            id : user.id
        },
        loginStatus
    };


}





module.exports = {
    validateEmailFormat,
    isEmailExist,
    isPasswoedExist,
    loginValidation
}