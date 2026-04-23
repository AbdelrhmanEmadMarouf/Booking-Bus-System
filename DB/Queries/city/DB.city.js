const {sql} = require('../../config'); 

const createCity = async(cityName)=>{
        await sql.query`
            INSERT INTO city (city_name)
            VALUES (${cityName})
        `;

}

const getCityId = async(cityName)=>{


        const cityId = await sql.query`
            SELECT city_id
            FROM CITY 
            WHERE city_name = ${cityName}
        `;


        return cityId.recordset[0].city_id;

}




module.exports = {
    createCity,
    getCityId
}