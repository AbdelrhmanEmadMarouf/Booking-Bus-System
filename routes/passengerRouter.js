const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/verifyToken.js');
const {userRoles} = require('../utils/userRoles.js');
const {allowedTo} = require('../middleware/allowedTo.js');
const {getPassengerData,getPassengerTickets,createTicket} = require('../controller/passenger.controller.js');


router.route('/')
        .get(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANGER,userRoles.PASSENGER),getPassengerData)

router.route('/tickets')
        .get(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANGER,userRoles.PASSENGER),getPassengerTickets)


router.route('/createTicket')
        .post(verifyToken,allowedTo(userRoles.PASSENGER),createTicket);



module.exports = router ;