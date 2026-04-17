const {sql} = require('../../config');
const fs = require('fs');
const bcrypt = require('bcrypt');
const errors = require('../../../utils/errors');
const {generateRefreshToken} = require('../../../utils/generateRefreshToken');

const insertOtp = async(otp)=>{
        await sql.query`
            INSERT INTO OTP_Table (OTP)
            VALUES (${otp})
        `;
}

const getOtpId = async(otp)=>{
    const otpId =await sql.query`
    SELECT id 
    FROM OTP_Table 
    WHERE OTP = ${otp}
`;

return otpId.recordset[0].id;

}

const insertUser = async(req)=>{

//* hashing password before storing in DB
const hashedPassword = await bcrypt.hash(req.body.password, 10);

//* handel the user avatar 
let avatarPath = null;

if (req.file) {
    avatarPath = `/uploads/${req.file.filename}`;
}else{
    avatarPath = `/uploads/personal image.jpeg`;
}

//* add valid avatar path into the request
req.avatarPath = avatarPath;


try{
await sql.query`
    INSERT INTO USERS(email, first_name, last_name, password,role,Avatar,phone)
    VALUES (
        ${req.body.email},
        ${req.body.first_name},
        ${req.body.last_name},
        ${hashedPassword},
        ${req.body.role},
        ${avatarPath},
        ${req.body.phone}
    )
`;
}catch(err){
    /*
    1- the file is already uploaded into the server 
    2- here the validation of the otp is faild so we deleted this file from the 
        server 
    */
    if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
    }

    throw errors.INTERNAL_SERVER_ERROR(err);
        
}



}

const insertRefreshToken = async(req)=>{


let userId = await sql.query`
    SELECT user_id 
    FROM USERS 
    WHERE email = ${req.body.email}
`;

const payload = { 
    email : req.body.email,
    first_name :req.body.first_name ,
    last_name : req.body.last_name,
    role : req.body.role,
    id : userId.recordset[0].user_id,
    phone : userId.recordset[0].phone
};

const refreshToken = generateRefreshToken(payload);

await sql.query`
UPDATE USERS
SET refresh_token = ${refreshToken}
WHERE user_id = ${userId.recordset[0].user_id}`;

return {
    payload,
    refreshToken
};

}

const updateRefteshToken = async(user,refreshToken)=>{
    await sql.query`
        UPDATE USERS
        SET refresh_token = ${refreshToken}
        WHERE user_id = ${user.user_id}
        `
}

const deleteOTP = async(otpId)=>{

    //* delte the otp to garante that is won't use after this process
    await sql.query`
            DELETE FROM OTP_Table 
            WHERE ID = ${otpId}
    `;

}

const getUserByEmail = async(email)=>{
    const user =   await sql.query`
        SELECT * 
        FROM USERS
        WHERE email = ${email}
    `;

    return user.recordset[0];
}

const validateOTP = async(otp,otpId)=>{

        const result = await sql.query`
            SELECT OTP FROM OTP_Table
            WHERE ID = ${otpId} AND OTP = ${otp}
        `;
        return result.recordset[0];

}



module.exports = {
    insertOtp,
    getOtpId,
    validateOTP,
    insertUser,
    insertRefreshToken,
    deleteOTP,
    getUserByEmail,
    updateRefteshToken,
}