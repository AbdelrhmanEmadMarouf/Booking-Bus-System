const asyncWrapper = require('../middleware/asyncWrapper');
const DB_user = require('../DB/Queries/users/DB.users');
const DB_Driver = require('../DB/Queries/driver/DB.driver');
const DB_Trip = require('../DB/Queries/trip/BD.trip');
const response = require('../utils/responses');
const validation = require('../utils/validations');



const getDriverData = asyncWrapper(async(req,res,next)=>{
    
    const driverId = req.currentUser.id;

    if(!await validation.isUserExist(driverId)){
        return response.DriverNotExist(res);
    }
    
    if(!await validation.isDriver(driverId)){
        return response.userIsNotDriver(res);
    }



    const driver = await DB_user.getuserById(driverId);






    response.successful(res, { 
        user_id  : driver.user_id ,
        first_name  : driver.first_name ,
        last_name  : driver.last_name ,
        phone  : driver.phone ,
        email  : driver.email ,
        avatar  : driver.avatar ,
        wallet_balance  : driver.wallet_balance ,
        license_number  : driver.license_number ,
        total_trips  : driver.total_trips ,
    });


})


const getDriverTrips = asyncWrapper(async(req,res,next)=>{


    const driverId = req.currentUser.id;

    if(!await validation.isUserExist(driverId)){
        return response.DriverNotExist(res);
    }
    
    if(!await validation.isDriver(driverId)){
        return response.userIsNotDriver(res);
    }

    const trips = await DB_Driver.getDriverTrips(driverId);
    response.successful(res, {trips});


})


const getDetaildTrip = asyncWrapper(async(req,res,next)=>{
    
    const tripId = req.params.tripId
    const driverId = req.currentUser.id;


    if(!await validation.isTripExist(tripId)){
        return response.tripNotExist(res);
    }

    if(!await validation.isTripDriver(tripId,driverId)){
        return response.notTripDriver(res);
    }
    
    const trip = await DB_Trip.getTrip(tripId);
    const tripPassengers = await DB_Trip.getTripPassengers(tripId);

    response.successful(res, {trip,tripPassengers});


})

const getDashboard = asyncWrapper(async(req,res,next)=>{


    const driverId = req.currentUser.id;

    const trips = await DB_Driver.getDriverTrips(driverId);

    const tripsNumber = trips.length;

    const totalPassengers = trips.reduce((sum, trip) => {
        return sum + trip.total_passengers;
    }, 0);

    response.successful(res, {tripsNumber,totalPassengers});


})




module.exports = {
        getDriverData,
        getDriverTrips,
        getDetaildTrip,
        getDashboard
}