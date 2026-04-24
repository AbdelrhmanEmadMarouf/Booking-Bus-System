const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/verifyToken.js');
const {userRoles} = require('../utils/userRoles.js');
const {allowedTo} = require('../middleware/allowedTo.js');
const {createTicket} = require('../controller/ticket.controller.js');


router.route('/create')
        .post(verifyToken,allowedTo(userRoles.PASSENGER),createTicket);


module.exports = router ;