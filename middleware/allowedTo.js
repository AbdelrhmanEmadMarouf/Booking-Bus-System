const utils = require('../utils/utils');
const response = require('../utils/responses');

const allowedTo = (...roles)=>{
    return (req,res,next) =>{

        if(roles.includes(req.currentUser.role)){
        return next();
        }
        response.invalidUser(res);
    };
}


module.exports = {
    allowedTo
}