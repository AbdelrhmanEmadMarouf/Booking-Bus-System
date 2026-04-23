const asyncWrapper = require('../middleware/asyncWrapper');
const generateJWT = require('../utils/generateJWT');
const {generateRefreshToken} = require('../utils/generateRefreshToken');
const sendOPT = require('../utils/senOTP');
const DB_Route = require('../DB/Queries/route/DB.route');
const validation = require('../utils/validations');
const response = require('../utils/responses');


const createRoute = asyncWrapper(async(req,res,next)=>{

    const name = req.body.name ;
    const distance = req.body.distance ;
    const duration = req.body.duration ;
    const origin = req.body.origin ;
    const destination = req.body.destination ;

    await DB_Route.createRoute(name,distance,duration,origin,destination);
    response.successful(res,{
        name,
        distance,
        duration,
        origin,
        destination
    });

})



module.exports = {
    createRoute
}