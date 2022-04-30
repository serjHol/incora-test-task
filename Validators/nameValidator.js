const nameValidator = (name) => {
    return /^[a-zA-Z]+$/.test(name);
};

module.exports = nameValidator;
