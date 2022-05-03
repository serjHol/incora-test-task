const { Client } = require("pg");

const client = new Client({
    connectionString:
        "postgres://fqiqafqbvrappg:a35f70fc9beab343b62a9804172fbb646b07c80a0bed50f63068f950890ff869@ec2-34-194-73-236.compute-1.amazonaws.com:5432/d8a6b35akqidad",
    ssl: {
        rejectUnauthorized: false,
    },
});

client.connect();

module.exports = client;
