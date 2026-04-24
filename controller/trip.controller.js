const asyncWrapper = require('../middleware/asyncWrapper');
const generateJWT = require('../utils/generateJWT');
const {generateRefreshToken} = require('../utils/generateRefreshToken');
const sendOPT = require('../utils/senOTP');
const DB_Trip = require('../DB/Queries/trip/BD.trip');
const validation = require('../utils/validations');
const response = require('../utils/responses');


const createTrip = asyncWrapper(async(req,res,next)=>{

    const routeName = req.body.routeName;
    const scheduled_arrival_date = req.body.scheduled_arrival_date;
    const scheduled_departure_date = req.body.scheduled_departure_date;
    const bus_id = req.body.bus_id;
    const driver_id = req.body.driver_id;

    if(!await validation.isDriver(driver_id)){
        return response.userIsNotDriver(res);
    }

    if(!await validation.isBusFree(scheduled_departure_date,scheduled_arrival_date,bus_id)){
        return response.busIsNotFree(res);
    }
    

    if(!await validation.isDriverFree(scheduled_departure_date,scheduled_arrival_date,driver_id)){
        return response.driverIsNotFree(res);
    }


    await DB_Trip.createTrip(routeName,scheduled_arrival_date,scheduled_departure_date,bus_id,driver_id);
    response.successful(res,{routeName,scheduled_arrival_date,scheduled_departure_date,bus_id,driver_id});

})



module.exports = {
    createTrip
}