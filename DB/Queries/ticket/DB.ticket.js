const {sql} = require('../../config'); 
const DB_seat = require('../seate/DB.seat')
const DB_bus = require('../bus/DB.bus')


const createTicket = async (
booking_date,
trip_id,
user_id,
seat_no
) => {

    await sql.query`
            INSERT INTO ticket (booking_date,trip_id,seat_no,user_id)
            VALUES(${booking_date},${trip_id},${seat_no},${user_id})
    `;

    const busId = await DB_bus.getBusId(trip_id);
    await DB_seat.bookSeat(busId,seat_no);
};


const getTicket = async(userId ,tripId)=>{
    const ticket = await sql.query`
            SELECT *
            FROM TICKET
            WHERE trip_id = ${tripId} 
            AND user_id = ${userId}
    `;

    return ticket.recordset[0]

}






module.exports = {
    createTicket,
    getTicket
}