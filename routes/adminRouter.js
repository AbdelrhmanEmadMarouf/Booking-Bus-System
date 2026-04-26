const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/verifyToken.js');
const {userRoles} = require('../utils/userRoles.js');
const {allowedTo} = require('../middleware/allowedTo.js');
const {addManger} = require('../controller/admin.controller.js');


router.route('/manger')
        .post(verifyToken,allowedTo(userRoles.ADMIN),addManger);


module.exports = router ;