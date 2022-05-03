const userConstructor = (user) => {
    delete user.password;
    return user;
};

module.exports = userConstructor;
