const {sql} = require('../../config'); 
const DB_City = require('../city/DB.city');

const createStation = async(stationName,cityName)=>{
        const cityId = await DB_City.getCityId(cityName);

        await sql.query`
            INSERT INTO Station (name,city_id)
            VALUES(${stationName},${cityId})
        `;
}

const getStationId = async(stationName)=>{


        const stationId = await sql.query`
                SELECT station_id
                FROM Station 
                WHERE name = ${stationName}
                `;

        if(!stationId.recordset.length){
                return undefined;
        }

        return stationId.recordset[0].station_id;

}
const getStartStation = async(tripId)=>{


        const station = await sql.query`
                SELECT s.name
                FROM TRIP t
                JOIN route r on t.route_id = r.route_id
                JOIN station s on s.station_id =  r.origin_station_id
                WHERE trip_id = ${tripId}
        `;

        if (!station.recordset.length) return null;

        return station.recordset[0].name;

}
const getEndStation = async(tripId)=>{


        const station = await sql.query`
                SELECT s.name
                FROM TRIP t
                JOIN route r on t.route_id = r.route_id
                JOIN station s on s.station_id =  r.destination_station_id
                WHERE trip_id = ${tripId}
        `;

        if (!station.recordset.length) return null;

        return station.recordset[0].name;

}




module.exports = {
        createStation,
        getStationId,
        getStartStation,
        getEndStation
}