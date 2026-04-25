const asyncWrapper = require('../middleware/asyncWrapper');
const DB_users = require('../DB/Queries/users/DB.users');
const response = require('../utils/responses');


const getPassengers = asyncWrapper(async(req,res,next)=>{

    const todayPassengers =  await DB_users.getPassengersToday();
    response.successful(res,{todayPassengers});
    

})



module.exports = {
    getPassengers
}