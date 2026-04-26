const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/verifyToken.js');
const {userRoles} = require('../utils/userRoles.js');
const {allowedTo} = require('../middleware/allowedTo.js');
const {getDashboardSummary,getPassengers,addDriver} = require('../controller/manger.controller');


router.route('/dashboard')
        .get(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANGER),getDashboardSummary);

router.route('/passenger/today')
        .get(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANGER),getPassengers);

router.route('/driver')
        .post(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANGER),addDriver);


module.exports = router ;