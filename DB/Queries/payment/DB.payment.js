const {sql} = require('../../config'); 



const getPayment = async(transactionId)=>{

        const payment = await sql.query`
                SELECT *
                FROM PAYMENT 
                WHERE transaction_id = ${transactionId}
                `;

        return payment.recordset[0];

}

const addPayment = async(paymentMethod,paymentDate,amount,userId,transactionId)=>{


    await sql.query`
        INSERT INTO payment (payment_method, payment_date, amount, user_id, transaction_id)
        VALUES (${paymentMethod}, ${paymentDate}, ${amount}, ${userId}, ${transactionId})
    `;

}

const getTotalRevenue = async()=>{

    const totalRevenue = await sql.query`
        SELECT SUM(T.price) AS total_revenue
        FROM trip T 
        JOIN ticket TK ON T.trip_id = TK.trip_id;
    `;

    return totalRevenue.recordset[0].total_revenue;
}
const getTotalRevenueToday = async()=>{

    const today = new Date().toISOString().split('T')[0];

    const totalRevenueToday = await sql.query`
            SELECT ISNULL(SUM(T.price), 0) AS total_revenue_today
            FROM trip T 
            JOIN ticket TK ON T.trip_id = TK.trip_id
            WHERE CAST(TK.booking_date AS DATE) = ${today}
    `;

    return totalRevenueToday.recordset[0].total_revenue_today;
}



module.exports = {
    getPayment,
    addPayment,
    getTotalRevenue,
    getTotalRevenueToday
}