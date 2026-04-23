const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/verifyToken.js');
const {userRoles} = require('../utils/userRoles.js');
const {allowedTo} = require('../middleware/allowedTo.js');

const {createCity} = require('../controller/city.controller.js');


// router.route('/')
//         .get(verifyToken,allowedTo(userRoles.MANGER,userRoles.ADMIN),coursesController.getAllCourses)   
//         .post(verifyToken,allowedTo(userRoles.ADMIN),
//             validationSchema.validationSchema()
//         ,
//     coursesController.createCourse);


router.route('/create')
        .post(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANGER),createCity);


module.exports = router ;