const {sql} = require('../../config');

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


module.exports = {
    insertOtp,
    getOtpId
}