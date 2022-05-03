const geoIp = require("geoip-country");
const { parsePhoneNumber } = require("libphonenumber-js");

const passwordValidator = (ip, phone) => {
    const phoneNumber = parsePhoneNumber(phone);
    console.log(phoneNumber);
    if (!phoneNumber.isValid()) {
        throw new Error("Phone number is incorrect");
    }
    const internationalFormat = phoneNumber.formatInternational();
    return internationalFormat;
};

module.exports = passwordValidator;
