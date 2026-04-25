const {sql} = require('../../config'); 
const DB_Route = require('../route/DB.route');


const createTrip = async (
    routeName,
    scheduled_arrival_date,
    scheduled_departure_date,
    bus_id,
    driver_id,
    price
) => {

    const routeId = await DB_Route.getRouteId(routeName);


    
    await sql.query`
    INSERT INTO Trip 
    (route_id, scheduled_arrival_date, scheduled_departure_date, bus_id, driver_id,price)
    VALUES 
    (
        ${routeId},
        CAST(${scheduled_arrival_date} AS DATETIME) AT TIME ZONE 'Egypt Standard Time',
        CAST(${scheduled_departure_date} AS DATETIME) AT TIME ZONE 'Egypt Standard Time',
        ${bus_id},
        ${driver_id},
        ${price}
        )
        `;
        

    const tripId = await getTripId(routeId,scheduled_arrival_date,scheduled_departure_date,bus_id,driver_id,price);

    
    return tripId

};

const getTripId = async(routeId,scheduled_arrival_date,scheduled_departure_date,bus_id,driver_id,price)=>{

    const triPId =  await sql.query`
                SELECT trip_id 
                FROM TRIP 
                WHERE 
                route_id =${routeId} AND 
                scheduled_arrival_date = CAST(${scheduled_arrival_date} AS DATETIME) AT TIME ZONE 'Egypt Standard Time' AND 
                scheduled_departure_date = CAST(${scheduled_departure_date} AS DATETIME) AT TIME ZONE 'Egypt Standard Time' AND 
                bus_id = ${bus_id} AND 
                driver_id = ${driver_id} AND
                price = ${price}
    `;

    return triPId.recordset[0].trip_id;

}

const getTrips = async()=>{
    const trips =   await sql.query`
        SELECT * 
        FROM trip
    `
    return trips;
}

const getTrip = async(tripId)=>{
    const trip =   await sql.query`
        SELECT * 
        FROM trip
        WHERE trip_id = ${tripId}
    `
    return trip.recordset[0];
}
const deleteTrip = async(tripId)=>{
    await sql.query`
            DELETE FROM trip 
            WHERE trip_id = ${tripId}
    `
    
}





module.exports = {
    createTrip,
    getTrips,
    getTrip,
    deleteTrip
}