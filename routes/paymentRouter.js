const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/verifyToken.js');
const {userRoles} = require('../utils/userRoles.js');
const {allowedTo} = require('../middleware/allowedTo.js');

const {createPayment ,paymentCallback , getTotalRevenue} = require('../controller/payment.controller.js');




router.route('/')
        .post(verifyToken,allowedTo(userRoles.PASSENGER),createPayment );

router.route('/callback')
        .post(paymentCallback )
        .get(paymentCallback);

router.route('/revenue')
        .get(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANGER),getTotalRevenue);


module.exports = router ;