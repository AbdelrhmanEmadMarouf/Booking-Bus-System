const {sql} = require('../../config'); 
const DB_City = require('../city/DB.city');



const getSeat = async(bus_id,seat_number)=>{
        const seat = await sql.query`
                SELECT * 
                FROM seat 
                WHERE seat_no = ${seat_number} AND bus_id = ${bus_id}
                `;

        return seat.recordset[0];
}

const bookSeat = async(bus_id,seat_number)=>{

        await sql.query`
                UPDATE seat 
                SET status = 'reserved'
                WHERE bus_id = ${bus_id} AND seat_no = ${seat_number}
                `;

}



module.exports = {
    getSeat,
    bookSeat
}