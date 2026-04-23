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

        return stationId.recordset[0].station_id;

}



module.exports = {
    createStation,
    getStationId
}