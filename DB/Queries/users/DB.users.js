const {sql} = require('../../config'); 
const {userRoles} = require('../../../utils/userRoles');

const getuserById = async(userId)=>{

        const userData = await sql.query`
            SELECT * FROM USERS 
            WHERE user_id = ${userId}
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

module.exports = {
    getuserById,
    getDriverTrips,
    isUserDriver,
    addBalance,
    withdrawFromWallet
}