const {sql} = require('../../config'); 
const {userRoles} = require('../../../utils/userRoles');

const getuserById = async(userId)=>{

        const userData = await sql.query`
            SELECT * FROM USERS 
            WHERE user_id = ${userId}
        `;


        return userData.recordset[0];

}

const getDriverTrips = async(userId)=>{

        const userData = await sql.query`
            FROM trip t
            WHERE t.driver_id = ${userId};
        `;


        return userData;

}

const isUserDriver = async(userId)=>{

        const role = await sql.query`
            SELECT role 
            FROM users 
            WHERE user_id = ${userId}
        `;

        return role.recordset[0].role==userRoles.DRIVER;
}


module.exports = {
    getuserById,
    getDriverTrips,
    isUserDriver
}