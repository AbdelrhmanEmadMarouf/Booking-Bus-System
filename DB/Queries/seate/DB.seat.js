const {sql} = require('../../config'); 


const getSeat = async(bus_id,tripId,seat_number)=>{


        const seat = await sql.query`
                SELECT * 
                FROM seat 
                WHERE seat_no = ${seat_number}
                AND bus_id = ${bus_id} 
                AND trip_id = ${tripId}
                `;

        return seat.recordset[0];
}

const getTripSeats = async(tripId)=>{

        const seats = await sql.query`
                SELECT seat_no,status 
                FROM SEAT
                WHERE trip_id = ${tripId}
                `;

        return seats.recordset;
}

const bookSeat = async(bus_id,tripId,seat_number)=>{

        await sql.query`
                UPDATE seat 
                SET status = 'reserved'
                WHERE bus_id = ${bus_id}
                AND seat_no = ${seat_number}
                AND trip_id = ${tripId}
                `;

}

const initializeTripSeats = async (busId, tripId) => {

        await sql.query`
                DECLARE @trip_id INT = ${tripId};
                DECLARE @bus_id INT = ${busId};

                WITH Numbers AS (
                SELECT 1 AS seat_no
                UNION ALL
                SELECT seat_no + 1
                FROM Numbers
                WHERE seat_no < (
                        SELECT capacity FROM bus WHERE bus_id = @bus_id
                )
                )

                INSERT INTO seat (trip_id, bus_id, seat_no, status)
                SELECT 
                @trip_id,
                @bus_id,
                seat_no,
                'free'
                FROM Numbers
                OPTION (MAXRECURSION 0);
        `;
};

const releaseSeats = async(tripId,busId)=>{
        await sql.query`
                DELETE FROM seat 
                WHERE trip_id = ${tripId} 
                AND bus_id = ${busId}
                `;
}



module.exports = {
        getSeat,
        bookSeat,
        initializeTripSeats,
        releaseSeats,
        getTripSeats
}