const STATUS_TEXT = {
    SUCCESS: "success",
    FAIL: "fail",
    ERROR: "error"
};

const HTTP_STATUS = {
// Success
OK: 200,
CREATED: 201,
ACCEPTED: 202,
NO_CONTENT: 204,


//  Client Errors
BAD_REQUEST: 400,
UNAUTHORIZED: 401,
FORBIDDEN: 403,
NOT_FOUND: 404,
METHOD_NOT_ALLOWED: 405,
CONFLICT: 409,
UNPROCESSABLE_ENTITY: 422,

//  Server Errors
INTERNAL_SERVER_ERROR: 500,
NOT_IMPLEMENTED: 501,
BAD_GATEWAY: 502,
SERVICE_UNAVAILABLE: 503
};

const MESSAGES = {
    COURSE_NOT_FOUND: "The requested course could not be found",
    ROUTE_NOT_FOUND: "The specified route does not exist",
    WRONG_EMAIL_FORMAT: "Invalid email format",
    WROG_OTP_VALIDATION: "Invalid OTP provided",
    REQUIRED_EMAIL: "Email is required",
    REQUIRED_PASSWORD: "Password is required",
    USER_NOT_FOUND: "User not found",
    DRIVER_NOT_FOUND: "Driver not found",
    WRONG_PASSWORD: "Incorrect password",
    REQUIRED_TOKEN: "Authentication token is required",
    INVALID_TOKEN: "Invalid authentication token",
    INVALID_REFRESH_TOKEN: "Invalid refresh token",
    YOU_ARE_NOT_ALLOW: "You are not authorized to perform this action",
    REFRESH_TOKEN_NOT_FOUND: "Refresh token not found",
    WRONG_FILE_TYPE: "Invalid file type",
    EXPIRED_OTP_Validation: "The OTP has expired",
    USER_IS_NOT_DRIVER: "The user is not registered as a driver",
    DRIVER_IS_NOT_FREE: "The driver is currently unavailable",
    BUS_IS_NOT_FREE: "The bus is currently unavailable",
    INVALID_TRIP_TIME: "Invalid trip time",
    TRIP_NOT_EXIST: "Trip does not exist",
    SEAT_NOT_FREE: "The selected seat is not available",
    NOT_ENOUGH_BALANCE: "Insufficient balance",
    USER_BOOKED_TRIP_ALREADY: "User has already booked this trip",
    USER_NOT_PASSENGER: "User is not a passenger",
    TRIP_DELETED: "Trip deleted successfully",
    NOT_TRIP_DRIVER: "The driver is not assigned to this trip",
    EMAIL_IS_ALREADY_EXIST: "Email already exists",
    PHONE_IS_ALREADY_EXIST: "Phone number already exists",
    Llicense_Number_IS_ALREADY_EXIST: "License number already exists",
    START_STATION_NOT_FOUND : "Start station is not founded",
    END_STATION_NOT_FOUND : "End station is not founded",
    INVALID_DATE : "Invalid date",
};



module.exports = {
    STATUS_TEXT,
    HTTP_STATUS,
    MESSAGES
}