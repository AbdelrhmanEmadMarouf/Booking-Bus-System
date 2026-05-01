const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/verifyToken.js');
const {userRoles} = require('../utils/userRoles.js');
const {allowedTo} = require('../middleware/allowedTo.js');

const {createTrip, getTrips,getTrip,endTrip,getTripsToday,getSeats,searchTrip} = require('../controller/trip.controller');




router.route('/create')
        .post(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANGER),createTrip);

router.route('/end/:tripId')
        .post(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANGER,userRoles.DRIVER),endTrip);

router.route('/')
        .get(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANGER,userRoles.PASSENGER),getTrips);

router.route('/search')
        .get(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANGER,userRoles.PASSENGER),searchTrip);

router.route('/today')
        .get(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANGER,userRoles.PASSENGER),getTripsToday);

router.route('/:tripId')
        .get(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANGER,userRoles.PASSENGER),getTrip);

router.route('/seats/:tripId')
        .get(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANGER,userRoles.PASSENGER),getSeats);



module.exports = router ;