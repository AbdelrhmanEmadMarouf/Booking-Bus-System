const asyncWrapper = require('../middleware/asyncWrapper');
const DB = require('../DB/Queries/city/DB.city');
const response = require('../utils/responses');


const createCity = asyncWrapper(async(req,res,next)=>{
    await DB.createCity(req.body.city_name);
    response.successful(res, {city : req.body.city_name});
})



module.exports = {
    createCity
}