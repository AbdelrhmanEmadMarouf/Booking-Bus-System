const {sql} = require('../../config'); 
const DB_Route = require('../route/DB.route');


const createTrip = async (
    routeId,
    scheduled_arrival_date,
    scheduled_departure_date,
    bus_id,
    driver_id,
    price
) => {



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
SELECT 
    t.trip_id,
    t.scheduled_departure_date,
    t.price,
    c1.city_name AS from_city,
    c2.city_name AS to_city,
    s1.name as start_station,
    s2.name as end_station,
    b.plate_no as bus_palte_no,
    u.first_name + ' ' +u.last_name as driver_name
FROM trip t
JOIN route r ON t.route_id = r.route_id
JOIN station s1 ON r.origin_station_id = s1.station_id
JOIN city c1 ON s1.city_id = c1.city_id
JOIN station s2 ON r.destination_station_id = s2.station_id
JOIN city c2 ON s2.city_id = c2.city_id
JOIN users u ON u.user_id = t.driver_id
JOIN bus b ON b.bus_id = t.bus_id
ORDER BY t.scheduled_departure_date;
    `
    return trips.recordset;
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

const getTripsToday = async () => {
    
    const today = new Date().toISOString().split('T')[0];

    const todayTrips = await sql.query`
        SELECT * 
        FROM trip
        WHERE CAST(scheduled_departure_date AS DATE) = CAST(${today} AS DATE)
    `;

    return todayTrips.recordset;
};




module.exports = {
    createTrip,
    getTrips,
    getTrip,
    deleteTrip,
    getTripsToday
}