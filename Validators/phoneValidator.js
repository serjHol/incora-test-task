
const { parsePhoneNumber } = require("libphonenumber-js");

const passwordValidator = (phone) => {
    const phoneNumber = parsePhoneNumber(phone);
    if (!phoneNumber.isValid()) {
        throw new Error("Phone number is incorrect");
    }
    const internationalFormat = phoneNumber.formatInternational();
    return internationalFormat;
};

module.exports = passwordValidator;
