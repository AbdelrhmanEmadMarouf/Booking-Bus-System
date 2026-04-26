const {sql} = require('../../config'); 
const {getNow} = require('../../../utils/date');

const addActiveLogs = async(title,description)=>{

    

        await sql.query`
            INSERT INTO activity_log (title,description,event_time)
            VALUES(${title},
            ${description},
            ${getNow()})
        `;

}
const getActiveLogs = async()=>{


        // const cityId = await sql.query`
        //     SELECT city_id
        //     FROM CITY 
        //     WHERE city_name = ${cityName}
        // `;


        // return cityId.recordset[0].city_id;

}




module.exports = {
    addActiveLogs
}