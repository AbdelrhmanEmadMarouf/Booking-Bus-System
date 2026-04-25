const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/verifyToken.js');
const {userRoles} = require('../utils/userRoles.js');
const {allowedTo} = require('../middleware/allowedTo.js');
const {createBus,releaseBookedSeats} = require('../controller/bus.controller.js');


router.route('/create')
        .post(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANGER),createBus);

// router.route('/create')
//         .post(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANGER),releaseBookedSeats);




module.exports = router ;