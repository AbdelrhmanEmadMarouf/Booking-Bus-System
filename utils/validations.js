const  validator = require('validator');
const errors = require('./errors');
const DB_auth = require('../DB/Queries/auth/DB.auth');
const DB_user = require('../DB/Queries/users/DB.users');
const DB_bus = require('../DB/Queries/bus/DB.bus');
const DB_trip = require('../DB/Queries/trip/BD.trip');
const DB_seat = require('../DB/Queries/seate/DB.seat');
const DB_Ticket = require('../DB/Queries/ticket/DB.ticket');
const DB_payment = require('../DB/Queries/payment/DB.payment');
const {userRoles} = require('./userRoles');
const {seatStatus} = require('../utils/seatsStatus')
const bcrypt = require('bcrypt');
const fs = require('fs');

const validateEmailFormat = (email) => {
    if (!validator.isEmail(email)) {
        throw errors.WRONG_EMAIL_FORMAT
    }
};

const isEmailExist = (email)=>{
        if(!email){
        throw errors.EMAIL_NOT_FOUND_ERROR
        }

}

const isPasswoedExist = (password)=>{
        if(!password){
        throw errors.PASSWORD_NOT_FOUND_ERROR
        }
}

const loginValidation = async(email,password)=>{


const user = await DB_auth.getUserByEmail(email);


    if(!user){
        throw errors.USER_NOT_FOUND_ERROR
    }

    const dbHashedPassword = user.password;

    //login password after hashing to matching it with the password that in DB
    //* if the two password are matched ==> return true else return false
    const loginStatus =  await bcrypt.compare(password, dbHashedPassword);

    return {
        data : {
            email : user.email ,
            first_name :user.first_name ,
            last_name : user.last_name,
            role : user.role,
            id : user.user_id
        },
        loginStatus
    };


}

const validateOTP = async(otp,otpId,req)=>{

    const result = await DB_auth.validateOTP(otp,otpId);


    if(result.length === 0){

    /*
    1- the file is already uploaded into the server 
    2- here the validation of the otp is faild so we deleted this file from the 
        server 
    */
    if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
    }
        throw errors.WRONG_OTP_ERROR;
    }

    const now = new Date();
    const createdTime = new Date(result.created_at);
    const expiryTime = new Date(createdTime.getTime() + result.expiration_time * 60000);
    

    if (now > expiryTime) {

        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        throw errors.EXPIRED_OTP_ERROR;
    }

    return true;


}

const isDriver = async(user_id)=>{
    return DB_user.isUserDriver(user_id);
}

const isDriverFree = async (startTime, endTime, driver_id) => {

    
    const driverData = await DB_user.getDriverTrips(driver_id);

    const newStart = new Date(startTime);

    const newEnd = new Date(endTime);


    for (const it of driverData.recordset) {

        const tripStart = new Date(it.scheduled_departure_date);
        const tripEnd = new Date(it.scheduled_arrival_date);

        if (newStart < tripEnd && newEnd > tripStart) {
            return false;
        }
    }

    return true;
};

const isBusFree = async(startTime,endTime,bus_id)=>{

    const busData = await DB_bus.getBusTrips(bus_id);

    const newTripStart = new Date(startTime);
    const newTripEnd = new Date(endTime);


for (const it of busData.recordset) {

    const tripStart = new Date(it.scheduled_departure_date);
    const tripEnd = new Date(it.scheduled_arrival_date);

    if (newTripStart < tripEnd && newTripEnd > tripStart) {

        return false;
    }
}

return true;


}

const isTripExist = async(tripId)=>{

    
    const trip = await DB_trip.getTrip(tripId);
    if(!trip){
        return false;
    }
    return true;

}

const isSeatFree = async(seatNumber,tripId)=>{


    const busId = await DB_bus.getBusId(tripId);


    const seat = await DB_seat.getSeat(busId,tripId,seatNumber);



    if(!seat){
        return false;
    }

    if(seat.status == seatStatus.RESERVED){
        return false;
    }

    return true;

}


const isTransactionExist = async(transactionId)=>{

    const payment = await DB_payment.getPayment(transactionId);

    if(!payment){
        return false;
    }

    return true;

}

const hasEnoughBalance = async(userId,tripPrice)=>{

    const userData = await DB_user.getuserById(userId);
    const balance = userData.wallet_balance;

    if(balance>=tripPrice){
        return true
    }

    return false

}

const isUserBookTrip = async(userId,tripId)=>{

    const ticket = await DB_Ticket.getTicket(userId,tripId);

    if(!ticket){
        return false
    }
    return true

}
const isUserExist = async(userId)=>{

    const user = await DB_user.getuserById(userId);

    if(!user){
        return false
    }
    return true

}
const isUserPassenger = async(userId)=>{

    const user = await DB_user.getuserById(userId);


    return user.role === userRoles.PASSENGER;

}

const isTripDriver = async(tripId,driverId)=>{

    const trip = await DB_trip.getTrip(tripId);
    const tripDriverId = trip.driver_id;

    return tripDriverId === driverId

}




module.exports = {
    validateEmailFormat,
    isEmailExist,
    isPasswoedExist,
    loginValidation,
    validateOTP,
    isDriverFree,
    isDriver,
    isBusFree,
    isTripExist,
    isSeatFree,
    isTransactionExist,
    hasEnoughBalance,
    isUserBookTrip,
    isUserExist,
    isUserPassenger,
    isTripDriver
}