const asyncWrapper = require('../middleware/asyncWrapper');
const generateJWT = require('../utils/generateJWT');
const {generateRefreshToken} = require('../utils/generateRefreshToken');
const sendOPT = require('../utils/senOTP');
const DB_auth = require('../DB/Queries/auth/DB.auth');
const validation = require('../utils/validations');
const response = require('../utils/responses');


const createTrip = asyncWrapper(async(req,res,next)=>{

    console.log('successfull');

})



module.exports = {
    createTrip
}