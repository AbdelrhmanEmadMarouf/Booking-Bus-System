const axios = require('axios');
const DB_user = require('../DB/Queries/users/DB.users');
const DB_payment = require('../DB/Queries/payment/DB.payment');
const validation = require('../utils/validations');
const asyncWrapper = require('../middleware/asyncWrapper');
const response = require('../utils/responses');


const PAYMOB_API_KEY = process.env.PAYMOB_API_KEY;
const PAYMOB_INTEGRATION_ID = process.env.PAYMOB_INTEGRATION_ID;
const PAYMOB_API_URL = process.env.PAYMOB_API_URL;
const PAYMOB_IFRAME_ID = process.env.PAYMOB_IFRAME_ID;


if (!PAYMOB_API_KEY || !PAYMOB_INTEGRATION_ID || !PAYMOB_IFRAME_ID || !PAYMOB_API_URL) {
    throw new Error("Paymob config missing");
}

let cachedToken = null;

async function getAuthToken() {
    try {
        // if (cachedToken) return cachedToken;

        const response = await axios.post(`${PAYMOB_API_URL}/auth/tokens`, {
            api_key: PAYMOB_API_KEY,
        });

        cachedToken = response.data.token;
        return cachedToken;

    } catch (err) {
        cachedToken = null;
        throw err;
    }
}


async function createOrder(authToken, amount,userId) {
    const response = await axios.post(
        `${PAYMOB_API_URL}/ecommerce/orders`,
        {
            auth_token: authToken,
            delivery_needed: "false",
            amount_cents: amount , 
            currency: "EGP",
            merchant_order_id: `user_${userId}_${Date.now()}_${amount}`,
            items: [],
        }
    );
    return response.data.id; 
}

async function createPaymentKey(authToken, orderId, amount ,user) {
    const response = await axios.post(
        `${PAYMOB_API_URL}/acceptance/payment_keys`,
        {
            auth_token: authToken,
            amount_cents: amount,
            expiration: 3600,
            order_id: orderId,
            billing_data: {
                first_name: user.first_name,
                last_name: user.last_name,
                phone_number: user.phone.startsWith('+2') ? user.phone : `+2${user.phone}`,
                email: user.email,
                country: "Egypt",
                city: "NA",
                street: "NA",
                building: "NA",
                floor: "NA",
                apartment: "NA",
            },
            currency: "EGP",
            integration_id: PAYMOB_INTEGRATION_ID,
        }
    );
    return response.data.token; 
}

async function createPayment(req, res) {
    
    try {
        const { amount } = req.body;
        const userId = req.user.id; 
        const user = await DB_user.getuserById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const amountNumber = Number(amount);

        if (!amount || isNaN(amountNumber) || amountNumber <= 0) {
            return res.status(400).json({ error: "Invalid amount" });
        }

        if (amountNumber > 50000) {
            return res.status(400).json({ error: "Amount too large" });
        }

        const amountCents = Math.round(amountNumber * 100);


        const authToken = await getAuthToken();
        const orderId = await createOrder(authToken, amountCents,userId );
        const paymentKey = await createPaymentKey(authToken, orderId, amountCents,user);


        
    const iframeUrl = `https://accept.paymob.com/api/acceptance/iframes/${PAYMOB_IFRAME_ID}?payment_token=${paymentKey}`;


        res.status(200).json({ success: true, iframeUrl });
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ success: false, error: error.message });
    }
}


async function paymentCallback(req, res) {
    try {

        const obj = req.body?.obj || req.query;

        const isSuccess =
            obj.success === true ||
            obj.success === 'true';

        if (!isSuccess) {
            return res.sendStatus(200);
        }

        const transactionId = Number(obj.id);
        let amount = obj.amount_cents;
        const merchantOrderId = obj.order?.merchant_order_id || req.query.merchant_order_id;

        amount = Number(amount)/100;

        if (!merchantOrderId) {
            console.log("No merchantOrderId");
            return res.sendStatus(200);
        }

        const userId = merchantOrderId.split('_')[1];

        if (await validation.isTransactionExist(transactionId)) {
            return res.sendStatus(200);
        }



        await DB_payment.addPayment(
            "card",
            new Date(),
            amount,
            userId,
            transactionId
        );

        await DB_user.addBalance(userId, amount);

        res.sendStatus(200);

    } catch (error) {
        console.error("Callback Error FULL:", error);
        res.sendStatus(500);
    }
}



module.exports = { createPayment ,paymentCallback};

            