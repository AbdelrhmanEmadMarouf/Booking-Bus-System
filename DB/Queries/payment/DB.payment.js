const {sql} = require('../../config'); 
const DB_user = require('../users/DB.users');


const getPayment = async(transactionId)=>{

        const payment = await sql.query`
                SELECT *
                FROM PAYMENT 
                WHERE transaction_id = ${transactionId}
                `;

        return payment.recordset[0];

}

const addPayment = async(paymentMethod,paymentDate,amount,userId,transactionId)=>{

            console.log("DEBUG INSERT =>", {
                paymentMethod,
                paymentDate,
                amount,
                userId,
                transactionId
});

    await sql.query`
        INSERT INTO payment (payment_method, payment_date, amount, user_id, transaction_id)
        VALUES (${paymentMethod}, ${paymentDate}, ${amount}, ${userId}, ${transactionId})
    `;

}



module.exports = {
    getPayment,
    addPayment
}