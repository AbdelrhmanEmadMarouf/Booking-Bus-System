const {sql} = require('../../config'); 
const DB_Route = require('../route/DB.route');
const DB_City = require('../city/DB.city');
const validation = require('../../../utils/validations');

const createTrip = async(routeName,scheduled_arrival_date,scheduled_departure_date,bus_id,driver_id)=>{

        const routeId = await DB_Route.getRouteId(routeName);

        await sql.query`
            INSERT INTO Trip 
            (route_id, scheduled_arrival_date, scheduled_departure_date, bus_id, driver_id)
            VALUES 
            (${routeId}, ${scheduled_arrival_date}, ${scheduled_departure_date}, ${bus_id}, ${driver_id});
        `;
}




module.exports = {
    createTrip,
}