require('dotenv').config()

const express = require('express');
const app = express();
const {connectDB} = require('./DB/config');
const cors = require('cors');
const path = require('path');
const utils = require('./utils/utils');
const authRouter = require('./routes/authRouter');
const tripRouter = require('./routes/tripRouter');
const routeRouter = require('./routes/routeRouter');
const stationRouter = require('./routes/stationRouter');
const cityRouter = require('./routes/cityRouter');
const busRouter = require('./routes/busRouter');
const ticketRouter = require('./routes/ticketRouter');
const paymentRouter = require('./routes/paymentRouter');
const usersRouter = require('./routes/usersRouter');
const mangerRouter = require('./routes/mangerRouter');
const adminRouter = require('./routes/adminRouter');

var corsOptions = {
    origin:  'http://127.0.0.1:5500',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const startServer = async () => {
    await connectDB();

    app.listen(process.env.SERVER_PORT || 4000, () => {
        console.log(`port is listening on ${process.env.SERVER_PORT}`);
    });
};


app.use(express.json()); //* tp parse request body into json


app.use('/api/auth',cors(corsOptions), authRouter);
app.use('/api/users',cors(corsOptions), usersRouter);
app.use('/api/manger',cors(corsOptions), mangerRouter);
app.use('/api/admin',cors(corsOptions), adminRouter);
app.use('/api/trip',cors(corsOptions), tripRouter);
app.use('/api/ticket',cors(corsOptions), ticketRouter);
app.use('/api/route',cors(corsOptions), routeRouter);
app.use('/api/station',cors(corsOptions), stationRouter);
app.use('/api/city',cors(corsOptions), cityRouter);
app.use('/api/bus',cors(corsOptions), busRouter);
app.use('/api/payment',cors(corsOptions), paymentRouter);
app.use('/uploads/',express.static(path.join(__dirname,'uploads')));



//globaler middle ware for not found routes
app.use((req,res,next)=>{
    res.status(utils.HTTP_STATUS.NOT_FOUND)  
        .json({
            status : utils.STATUS_TEXT.ERROR,
            message : utils.MESSAGES.ROUTE_NOT_FOUND
        });
});

// global middleware for error handler
app.use((err,req,res,next)=>{
        res.status(err.statusCode || utils.HTTP_STATUS.INTERNAL_SERVER_ERROR)  
        .json({
            status : err.statusMessage ||utils.STATUS_TEXT.ERROR,
            message : err.message,
            code : err.statusCode || utils.HTTP_STATUS.INTERNAL_SERVER_ERROR
        });
})

startServer();