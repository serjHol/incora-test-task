const db = require("./DB.js");

class SQLQueries {
    async createUser(first_name, last_name = null, email, phone = null, password) {
        return db.query(
            "INSERT INTO users (first_name, last_name, email, phone, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [first_name, last_name, email, phone, password]
        );
    }
}

module.exports = new SQLQueries();
