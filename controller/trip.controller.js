const asyncWrapper = require('../middleware/asyncWrapper');
const DB_Trip = require('../DB/Queries/trip/BD.trip');
const DB_Ticket = require('../DB/Queries/ticket/DB.ticket');
const DB_Seat = require('../DB/Queries/seate/DB.seat');
const DB_bus = require('../DB/Queries/bus/DB.bus');
const DB_User = require('../DB/Queries/users/DB.users');
const validation = require('../utils/validations');
const response = require('../utils/responses');


const createTrip = asyncWrapper(async(req,res,next)=>{

    const routeName = req.body.routeName;
    const scheduled_arrival_date = req.body.scheduled_arrival_date;
    const scheduled_departure_date = req.body.scheduled_departure_date;
    const bus_id = req.body.bus_id;
    const driver_id = req.body.driver_id;
    const price = req.body.price;

    if(!await validation.isDriver(driver_id)){
        return response.userIsNotDriver(res);
    }

    if (new Date(scheduled_arrival_date) <= new Date(scheduled_departure_date)) {
        return response.invalidTripTime(res);
    }

    if(!await validation.isBusFree(scheduled_departure_date,scheduled_arrival_date,bus_id)){
        return response.busIsNotFree(res);
    }
    
    if(!await validation.isDriverFree(scheduled_departure_date,scheduled_arrival_date,driver_id)){
        return response.driverIsNotFree(res);
    }


    const tripId =   await DB_Trip.createTrip(routeName,scheduled_arrival_date,scheduled_departure_date,bus_id,driver_id,price);

    await DB_User.incrementUserTrips(driver_id); //* increment driver trips
    

    await DB_Seat.initializeTripSeats(bus_id,tripId);
    
    response.successful(res,{routeName,scheduled_arrival_date,scheduled_departure_date,bus_id,driver_id});

})


const getTrips = asyncWrapper(async(req,res,next)=>{
    const trips = await DB_Trip.getTrips();
    response.successful(res,{trips});
})
const getTripsToday = asyncWrapper(async(req,res,next)=>{
    const trips = await DB_Trip.getTripsToday();
    response.successful(res,{trips});
})

const getTrip = asyncWrapper(async(req,res,next)=>{

    const tripId =  req.params.tripId;

    const trip = await DB_Trip.getTrip(tripId);
    response.successful(res,{trip});

})


const getSeats = asyncWrapper(async(req,res,next)=>{

    console.log('test');

    const tripId =  req.params.tripId;

    const seats = await DB_Seat.getTripSeats(tripId);
    response.successful(res,{seats});

})

const endTrip = asyncWrapper(async(req,res,next)=>{

    const tripId =  req.params.tripId;
    const driverId =  req.user.id;

    if(!await validation.isTripExist(tripId)){
        return response.tripNotExist(res);
    }

    if(!await validation.isTripDriver(tripId,driverId)){
        return response.notTripDriver(res);
    }

    const busId = await DB_bus.getBusId(tripId);

    await DB_Ticket.daleteTicketByTripId(tripId);
    await DB_Seat.releaseSeats(tripId,busId);
    await DB_Trip.deleteTrip(tripId);


    response.endTrip(res);

})


module.exports = {
    createTrip,
    getTrips,
    getTrip,
    endTrip,
    getTripsToday,
    getSeats
}