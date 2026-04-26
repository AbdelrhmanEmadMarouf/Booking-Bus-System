const asyncWrapper = require('../middleware/asyncWrapper');
const DB_manger = require('../DB/Queries/manger/DB.manger');
const DB_auth = require('../DB/Queries/auth/DB.auth');
const DB_user = require('../DB/Queries/users/DB.users');
const response = require('../utils/responses');
const generateJWT = require('../utils/generateJWT');
const {userRoles} = require('../utils/userRoles');
const validation = require('../utils/validations');
const DB_active = require('../DB/Queries/activities/DB.active');
const {activity,getDriverSubTitleLog} = require('../utils/activities');

const getPassengers = asyncWrapper(async(req,res,next)=>{

    const todayPassengers =  await DB_manger.getPassengersToday();
    
    response.successful(res,{todayPassengers});
    

})

const getDashboardSummary = asyncWrapper(async(req,res,next)=>{

    const dashboardSummary =  await DB_manger.getDashboardSummary();
    response.successful(res,{dashboardSummary});
    

})
const getActivities = asyncWrapper(async(req,res,next)=>{

    const activities =  await DB_manger.getActivities();
    response.successful(res,{activities});
    

})


const addDriver = asyncWrapper(async(req,res,next)=>{

        req.body.role = userRoles.DRIVER;
        const driverName = `${req.body.first_name} ${req.body.last_name}`;
        const driverLlicenseNumber = req.body.license_number;

        const newUser = req.body;
        validation.validateEmailFormat(newUser.email);

        if(await validation.isEmailAlreadyExist(newUser.email)){
        return response.emailAlreadyExist(res);
        }

        if(await validation.isLlicenseNumberAlreadyExist(driverLlicenseNumber)){
        return response.LlicenseNumberAlreadyExist(res);
        }

        if(await validation.isPhoneAlreadyExist(newUser.phone)){
        return  response.phoneAlreadyExist(res);
        }

        await DB_auth.insertUser(req);
        const tokensData = await DB_auth.insertRefreshToken(req);
        const accessToken =  generateJWT(tokensData.payload);

        await DB_active.addActiveLogs(activity.DRIVER_REGISTERED,await getDriverSubTitleLog(driverName,driverLlicenseNumber));

        return response.validateOtp(tokensData.payload,req.avatarPath,accessToken,tokensData.refreshToken,res)
    

})

const getDrivers = asyncWrapper(async(req,res,next)=>{

        const drivers = await DB_user.getDrivers();

        return response.successful(res,{drivers});


})





module.exports = {
    getDashboardSummary,
    getPassengers,
    addDriver,
    getActivities,
    getDrivers
}