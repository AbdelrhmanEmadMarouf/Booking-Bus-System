const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/verifyToken.js');
const {userRoles} = require('../utils/userRoles.js');
const {allowedTo} = require('../middleware/allowedTo.js');
const {getDriver} = require('../controller/driver.controller.js');



router.route('/:driverId')
        .get(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANGER,userRoles.DRIVER),getDriver)


module.exports = router ;