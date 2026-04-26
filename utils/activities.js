const DB_Station = require('../DB/Queries/station/DB.station');
const DB_User = require('../DB/Queries/users/DB.users');

const activity = {
    BOOKING_TRIP: 'New booking',
    TRIP_CONFIRMED: 'Trip confirmed',
    REFUND_REQUEST: 'New refund request',
    DRIVER_REGISTERED: 'New driver registered'
};

const getBookingTripTitle = async (userId) => {
    const user = await DB_User.getuserById(userId);

    if (!user) return null;

    const userName = `${user.first_name} ${user.last_name}`;

    return `${activity.BOOKING_TRIP} from ${userName}`;
};

const getBookingTripSubTitle = async (tripId) => {
    const startStation = await DB_Station.getStartStation(tripId);
    const endStation = await DB_Station.getEndStation(tripId);

    if (!startStation || !endStation) return null;

    return `${startStation} → ${endStation}`;
};

const getDriverSubTitleLog = async (driverName, driverLicenseNumber) => {
    if (!driverName || !driverLicenseNumber) return null;

    return `${driverName} - License ${driverLicenseNumber}`;
};

module.exports = {
    activity,
    getBookingTripSubTitle,
    getBookingTripTitle,
    getDriverSubTitleLog
};