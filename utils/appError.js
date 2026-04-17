class AppError extends Error {
    constructor(message, statusText, statusCode) {
        super(message);
        this.statusText = statusText;
        this.statusCode = statusCode;
    }

    static create(message, statusText, statusCode) {
        return new AppError(message, statusText, statusCode);
    }
}

module.exports = AppError;