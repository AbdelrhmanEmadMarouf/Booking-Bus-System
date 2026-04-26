const {sql} = require('../../config'); 
const DB_Trips = require('../trip/BD.trip');
const DB_Payment = require('../payment/DB.payment');


const getPassengersToday = async()=>{

    const today = new Date().toISOString().split('T')[0];


    const todayPassengers = await sql.query`
            SELECT U.*
            FROM TRIP T 
            JOIN ticket TK ON T.trip_id = TK.trip_id
            JOIN USERS U ON Tk.user_id = U.user_id
            WHERE CAST(scheduled_departure_date AS DATE) = ${today}
    `;

    const passengers = todayPassengers.recordset.map(user => {
        const { refresh_token, ...safeUser } = user;
        return safeUser;
    });


    return passengers;

}

const getDashboardSummary = async()=>{



    const totalTripsToday = await DB_Trips.getTripsToday();
    const totalPassengersToday = await getPassengersToday();
    const totalRevnue = await DB_Payment.getTotalRevenue();
    const totalRevnueToday = await DB_Payment.getTotalRevenueToday();
    

    const dashboardSummary = {
        totalPassengersToday : totalPassengersToday.length,
        totalTripsToday : totalTripsToday.length,
        totalRevnue : totalRevnue,
        totalRevnueToday : totalRevnueToday
    }

        return dashboardSummary;

}



module.exports = {
    getDashboardSummary,
    getPassengersToday
}