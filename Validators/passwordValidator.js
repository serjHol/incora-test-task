const passwordValidator = (password) => {
    return /^[a-zA-Z0-9]{8,24}$/.test(password);
};

module.exports = passwordValidator;
