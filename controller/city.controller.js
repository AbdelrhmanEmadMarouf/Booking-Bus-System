const asyncWrapper = require('../middleware/asyncWrapper');
const generateJWT = require('../utils/generateJWT');
const {generateRefreshToken} = require('../utils/generateRefreshToken');
const sendOPT = require('../utils/senOTP');
const DB = require('../DB/Queries/city/DB.city');
const validation = require('../utils/validations');
const response = require('../utils/responses');


const cityRoute = asyncWrapper(async(req,res,next)=>{
    await DB.createCity(req.body.city_name);
    response.successful(res, {city : req.body.city_name});
})



module.exports = {
    cityRoute
}