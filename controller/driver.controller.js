const asyncWrapper = require('../middleware/asyncWrapper');
const DB_user = require('../DB/Queries/users/DB.users');
const response = require('../utils/responses');
const validation = require('../utils/validations');



const getDriver = asyncWrapper(async(req,res,next)=>{
    
    const driverId = req.params.driverId

    if(!await validation.isUserExist(driverId)){
        return response.DriverNotExist(res);
    }
    
    if(!await validation.isDriver(driverId)){
        return response.userIsNotDriver(res);
    }



    const driver = await DB_user.getuserById(driverId);






    response.successful(res, { 
        user_id  : driver.user_id ,
        first_name  : driver.first_name ,
        last_name  : driver.last_name ,
        phone  : driver.phone ,
        email  : driver.email ,
        avatar  : driver.avatar ,
        wallet_balance  : driver.wallet_balance ,
        license_number  : driver.license_number ,
        total_trips  : driver.total_trips ,
    });


})





module.exports = {
        getDriver
}