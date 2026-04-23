const {sql} = require('../../config'); 
const DB_Station = require('../station/DB.station');

const createRoute = async(distance,duration,origin_station,destination_station)=>{

    const origin_station_id = await DB_Station.getStationId(origin_station);
    const destnation_station_id = await DB_Station.getStationId(destination_station);

        await sql.query`
            INSERT INTO Route (distance,duration,origin_station_id,destination_station_id)
            VALUES (${distance},${duration},${origin_station_id},${destnation_station_id})
        `;

}




module.exports = {
    createRoute
}