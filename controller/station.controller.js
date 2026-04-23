const asyncWrapper = require('../middleware/asyncWrapper');
const generateJWT = require('../utils/generateJWT');
const {generateRefreshToken} = require('../utils/generateRefreshToken');
const sendOPT = require('../utils/senOTP');
const DB = require('../DB/Queries/station/DB.station');
const validation = require('../utils/validations');
const response = require('../utils/responses');


const stationRoute = asyncWrapper(async(req,res,next)=>{

    await DB.createStation(req.body.station_name,req.body.city_name);
    response.successful(res,{
        station : req.body.station_name,
        city : req.body.city_name
    });
    

})



module.exports = {
    stationRoute
}