const {sql} = require('../../config'); 
const {userRoles} = require('../../../utils/userRoles');
const DB_Trips = require('../trip/BD.trip');

const getuserById = async(userId)=>{

        const userData = await sql.query`
            SELECT * FROM USERS 
            WHERE user_id = ${userId}
        `;


        return userData.recordset[0];

}
const getUserBylicenseNumber = async(licenseNumber)=>{

        const userData = await sql.query`
            SELECT * FROM USERS 
            WHERE license_number = ${licenseNumber}
        `;


        return userData.recordset[0];

}

const getDriverTrips = async(driverId)=>{

        const userData = await sql.query`
            SELECT *
            FROM trip t
            WHERE t.driver_id = ${driverId};
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

const getUserBalance = async(userId)=>{
        const balance = await sql.query`
            SELECT wallet_balance 
            FROM USERS 
            WHERE user_id = ${userId}
        `; 
        return Number(balance.recordset[0].wallet_balance);
}


const addBalance = async(userId,amount)=>{

    const balance = await getUserBalance(userId);
    const newBalance = balance + amount;

    await sql.query`
        UPDATE Users 
        SET wallet_balance = ${newBalance}
        WHERE user_id = ${userId}
    `;
}


const withdrawFromWallet = async(userId,amount)=>{

    const balance = await getUserBalance(userId);
    const newBalance = balance - amount;

    await sql.query`
        UPDATE Users 
        SET wallet_balance = ${newBalance}
        WHERE user_id = ${userId}
    `;


}

const getUserByEmail = async(email)=>{

    const user = await sql.query`
        SELECT * 
        FROM USERS
        WHERE email = ${email}
    `;

    return user.recordset[0];

}
const getUserByPhone = async(phone)=>{

    const user = await sql.query`
        SELECT * 
        FROM USERS
        WHERE phone = ${phone}
    `;

    return user.recordset[0];

}

const incrementUserTrips = async(userId)=>{

    let totalTrips = await sql.query`
        SELECT total_trips  
        FROM USERS
        WHERE user_id = ${userId}
    `;

    
    totalTrips = totalTrips.recordset[0].total_trips +1;
    
    
    await sql.query`
        UPDATE USERS 
        SET total_trips = ${totalTrips}
        WHERE user_id = ${userId}
    `;


}



module.exports = {
    getuserById,
    getDriverTrips,
    isUserDriver,
    addBalance,
    withdrawFromWallet,
    getUserByEmail,
    getUserByPhone,
    getUserBylicenseNumber,
    incrementUserTrips
}