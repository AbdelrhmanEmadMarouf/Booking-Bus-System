const asyncWrapper = require('../middleware/asyncWrapper');
const DB_Ticket = require('../DB/Queries/ticket/DB.ticket');
const validation = require('../utils/validations');
const response = require('../utils/responses');


const createTicket = asyncWrapper(async(req,res,next)=>{

    const booking_date = req.body.booking_date;
    const trip_id = req.body.trip_id;
    const user_id = req.body.user_id;
    const seat_no = req.body.seat_no;

    if(!await validation.isTripExist(trip_id)){
        return response.tripNotExist(res);
    }

    if(!await validation.isSeatFree(seat_no,trip_id)){
        return response.seatNotFree(res);
    }

    await DB_Ticket.createTicket(booking_date,trip_id,user_id,seat_no);
    response.successful(res,{booking_date,trip_id,user_id,seat_no});


})



module.exports = {
    createTicket
}