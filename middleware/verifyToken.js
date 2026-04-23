const jwt = require('jsonwebtoken');
const utils = require('../utils/utils');
// const { response } = require('express');
const response = require('../utils/responses');
const verifyToken = async(req,res,next)=>{

    const authHeader = req.headers['Authorization'] || req.headers['authorization'];

    if(!authHeader){
        return response.tokenNotFound(res);
    }

    const token = authHeader.split(' ')[1];

    try{
    //*if it doesn't throw an exception so it means that the validation is valid
    const currentUser = jwt.verify(token,process.env.SECRET_KEY);
    req.currentUser = currentUser;
    next();

    }catch(err){
        return response.invalidToken(res,err);
    }
}

module.exports = {
    verifyToken
}