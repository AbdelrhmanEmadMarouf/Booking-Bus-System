const {sql} = require('../../config'); 

const createBus = async(model,capacity,plate_no)=>{

        await sql.query`
            INSERT INTO bus (model,capacity,plate_no)
            VALUES(${model},${capacity},${plate_no});
        `;

}

const getBusTrips = async(busId)=>{

    const busData = await sql.query`
        SELECT 
            t.trip_id,
            t.scheduled_departure_date,
            t.scheduled_arrival_date
        FROM trip t
        WHERE t.bus_id = ${busId};
    `;
        return busData;

}


const getBusId = async(tripId)=>{

    const busId = await sql.query`
        SELECT bus_id 
        FROM trip 
        WHERE trip_id = ${tripId};
    `;
        return busId.recordset[0].bus_id;

}





module.exports = {
    createBus,
    getBusTrips,
    getBusId
}