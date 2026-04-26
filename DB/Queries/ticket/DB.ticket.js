const {sql} = require('../../config'); 


const createTicket = async (
trip_id,
user_id,
seat_no
) => {


    const today = new Date().toISOString().split('T')[0];;

    await sql.query`
            INSERT INTO ticket (booking_date,trip_id,seat_no,user_id)
            VALUES(${today},${trip_id},${seat_no},${user_id})
    `;
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
const daleteTicketByTripId = async(tripId)=>{

    await sql.query`
            DELETE FROM TICKET 
            WHERE trip_id = ${tripId}
    `;


}



module.exports = {
    createTicket,
    getTicket,
    daleteTicketByTripId
}