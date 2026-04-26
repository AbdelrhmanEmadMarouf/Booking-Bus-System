const asyncWrapper = require('../middleware/asyncWrapper');
const DB_Ticket = require('../DB/Queries/ticket/DB.ticket');
const DB_User = require('../DB/Queries/users/DB.users');
const DB_trip = require('../DB/Queries/trip/BD.trip');
const DB_bus = require('../DB/Queries/bus/DB.bus');
const DB_seat = require('../DB/Queries/seate/DB.seat');
const DB_active = require('../DB/Queries/activities/DB.active');
const validation = require('../utils/validations');
const response = require('../utils/responses');
const {getBookingTripTitle,getBookingTripSubTitle} = require('../utils/activities');


const createTicket = asyncWrapper(async(req,res,next)=>{

    const today = new Date().toISOString().split('T')[0];
    const trip_id = req.body.trip_id;
    const user_id = req.user.id;
    const seat_no = req.body.seat_no;

    if(!await validation.isUserExist(user_id)){
        return response.userNotExist(res);
    }

    if(!await validation.isUserPassenger(user_id)){
        return response.userIsNotPassenger(res);
    }

    if(!await validation.isTripExist(trip_id)){
        return response.tripNotExist(res);
    }

    if(!await validation.isSeatFree(seat_no,trip_id)){
        return response.seatNotFree(res);
    }

    if(await validation.isUserBookTrip(user_id,trip_id)){
        return response.UserBookedTripAlready(res);
    }

    const trip = await DB_trip.getTrip(trip_id);
    const tripPrice = trip.price;
    
    if(!await validation.hasEnoughBalance(user_id,tripPrice)){
        return response.notEnoughBalance(res);
    }


    await DB_Ticket.createTicket(trip_id,user_id,seat_no);

    const busId = await DB_bus.getBusId(trip_id);
    await DB_seat.bookSeat(busId,trip_id,seat_no);
    await DB_User.incrementUserTrips(user_id);
    await DB_User.withdrawFromWallet(user_id,tripPrice);
    await DB_active.addActiveLogs(await getBookingTripTitle(user_id),await getBookingTripSubTitle(trip_id));

    response.successful(res,{booking_date : today,trip_id,user_id,seat_no});

})



module.exports = {
    createTicket
}