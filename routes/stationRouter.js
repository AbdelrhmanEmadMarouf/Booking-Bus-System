const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/verifyToken.js');
const {userRoles} = require('../utils/userRoles.js');
const {allowedTo} = require('../middleware/allowedTo.js');

const {createStation} = require('../controller/station.controller.js');



router.route('/create')
        .post(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANGER),createStation);


module.exports = router ;