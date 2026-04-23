const {sql} = require('../../config'); 
const DB_Station = require('../station/DB.station');

const createRoute = async(name,distance,duration,origin_station,destination_station)=>{

    const origin_station_id = await DB_Station.getStationId(origin_station);
    const destnation_station_id = await DB_Station.getStationId(destination_station);
        await sql.query`
            INSERT INTO Route (name,distance,duration,origin_station_id,destination_station_id)
            VALUES (${name},${distance},${duration},${origin_station_id},${destnation_station_id})
        `;

}

const getRouteId = async(routeName)=>{

        const routeId = await sql.query`
            SELECT route_id
            FROM ROUTE Route 
            WHERE name = ${routeName}
            `;

        return routeId.recordset[0].route_id;

}







module.exports = {
    createRoute,
    getRouteId
}