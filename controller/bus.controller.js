const asyncWrapper = require('../middleware/asyncWrapper');
const generateJWT = require('../utils/generateJWT');
const {generateRefreshToken} = require('../utils/generateRefreshToken');
const sendOPT = require('../utils/senOTP');
const DB_BUS = require('../DB/Queries/bus/DB.bus');
const validation = require('../utils/validations');
const response = require('../utils/responses');


const createBus = asyncWrapper(async(req,res,next)=>{

    const model  = req.body.model;
    const capacity  = req.body.capacity;
    const plate_no  = req.body.plate_no;

    await DB_BUS.createBus(model,capacity,plate_no);
    response.successful(res, {model ,capacity , plate_no});

})



module.exports = {
    createBus
}