const asyncWrapper = require('../middleware/asyncWrapper');
const DB = require('../DB/Queries/station/DB.station');
const response = require('../utils/responses');


const createStation = asyncWrapper(async(req,res,next)=>{

    await DB.createStation(req.body.station_name,req.body.city_name);
    response.successful(res,{
        station : req.body.station_name,
        city : req.body.city_name
    });
    

})



module.exports = {
    createStation
}