const { Client } = require("pg");

const client = new Client({
    connectionString:
        "postgres://unqsfnsiqjfonu:4dd9afbf96d0b3358add8c1b5936d9850455b880ecc548cefa6ba0e19509f3c8@ec2-3-211-6-217.compute-1.amazonaws.com:5432/d2jsadj4t5uih1",
    ssl: {
        rejectUnauthorized: false,
    },
});

client.connect();

module.exports = client;
