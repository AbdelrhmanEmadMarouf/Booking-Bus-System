const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/verifyToken.js');
const {userRoles} = require('../utils/userRoles.js');
const {allowedTo} = require('../middleware/allowedTo.js');
const {getPassengers} = require('../controller/users.controller.js');


router.route('/passenger/today')
        .get(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANGER),getPassengers);



module.exports = router ;