const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/verifyToken.js');
const {userRoles} = require('../utils/userRoles.js');
const {allowedTo} = require('../middleware/allowedTo.js');
const {getDriverData,getDriverTrips,getDetaildTrip,getDashboard} = require('../controller/driver.controller.js');


router.route('/trips/')
        .get(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANGER,userRoles.DRIVER),getDriverTrips)

router.route('/dashboard/')
        .get(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANGER,userRoles.DRIVER),getDashboard)

router.route('/')
        .get(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANGER,userRoles.DRIVER),getDriverData)


router.route('/trip/:tripId')
        .get(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANGER,userRoles.DRIVER),getDetaildTrip)


module.exports = router ;