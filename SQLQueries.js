const db = require("./DB.js");

class SQLQueries {
    async createUser(first_name, last_name = null, email, phone = null, password) {
        return await db.query(
            "INSERT INTO users (first_name, last_name, email, phone, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [first_name, last_name, email, phone, password]
        );
    }

    async getUserByEmail(email) {
        return await db.query(`SELECT * FROM users WHERE email = '${email}'`);
    }

    async getUserById(id) {
        return await db.query(`SELECT * FROM users WHERE id = ${id}`);
    }
    async updateUser(id, first_name, last_name, email, phone, password) {
        return await db.query(
            "UPDATE users SET first_name = $1, last_name = $2, email = $3, phone = $4, password = $5 WHERE id = $6 RETURNING *", [first_name, last_name, email, phone, password, id]
        );
    }
}

module.exports = new SQLQueries();
