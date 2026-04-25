const asyncWrapper = require('../middleware/asyncWrapper');
const DB_BUS = require('../DB/Queries/bus/DB.bus');
const DB_Seat = require('../DB/Queries/seate/DB.seat');
const response = require('../utils/responses');


const createBus = asyncWrapper(async(req,res,next)=>{

    const model  = req.body.model;
    const capacity  = req.body.capacity;
    const plate_no  = req.body.plate_no;

    await DB_BUS.createBus(model,capacity,plate_no);
    response.successful(res, {model ,capacity , plate_no});

})

// const releaseBookedSeats = asyncWrapper(async(req,res,next)=>{

//     const busId  = req.body.busId;;
//     await DB_Seat.releaseSeats(busId);
//     response.successful(res, {busId});

// })



module.exports = {
    createBus
}