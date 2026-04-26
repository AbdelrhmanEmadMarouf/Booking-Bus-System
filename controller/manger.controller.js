const asyncWrapper = require('../middleware/asyncWrapper');
const DB_manger = require('../DB/Queries/manger/DB.manger');
const response = require('../utils/responses');


const getPassengers = asyncWrapper(async(req,res,next)=>{

    const todayPassengers =  await DB_manger.getPassengersToday();
    
    response.successful(res,{todayPassengers});
    

})

const getDashboardSummary = asyncWrapper(async(req,res,next)=>{

    const dashboardSummary =  await DB_manger.getDashboardSummary();
    response.successful(res,{dashboardSummary});
    

})





module.exports = {
    getDashboardSummary,
    getPassengers
}