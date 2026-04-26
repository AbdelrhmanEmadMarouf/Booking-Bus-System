const { DateTime } = require('luxon');

const getNow = () => {
    const dt = DateTime.now();

    return dt.toFormat("yyyy-MM-dd HH:mm:ss") + '.' +
        dt.toFormat("SSS") + '0000 ' +
        dt.toFormat("ZZ");
};


module.exports = {
    getNow
}