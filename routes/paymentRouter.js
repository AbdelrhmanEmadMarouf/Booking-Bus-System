const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/verifyToken.js');
const {userRoles} = require('../utils/userRoles.js');
const {allowedTo} = require('../middleware/allowedTo.js');

const {createPayment } = require('../controller/payment.controller.js');




router.route('/')
        .post(verifyToken,allowedTo(userRoles.PASSENGER),createPayment );


module.exports = router ;