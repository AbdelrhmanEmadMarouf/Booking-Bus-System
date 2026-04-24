const {sql} = require('../../config'); 
const DB_Route = require('../route/DB.route');


const createTrip = async (
    routeName,
    scheduled_arrival_date,
    scheduled_departure_date,
    bus_id,
    driver_id
) => {

    const routeId = await DB_Route.getRouteId(routeName);

    await sql.query`
        INSERT INTO Trip 
        (route_id, scheduled_arrival_date, scheduled_departure_date, bus_id, driver_id)
        VALUES 
        (
            ${routeId},
            CAST(${scheduled_arrival_date} AS DATETIME) AT TIME ZONE 'Egypt Standard Time',
            CAST(${scheduled_departure_date} AS DATETIME) AT TIME ZONE 'Egypt Standard Time',
            ${bus_id},
            ${driver_id}
        );
    `;
};




module.exports = {
    createTrip,
}