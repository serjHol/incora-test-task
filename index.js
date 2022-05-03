const express = require("express");
const cors = require("cors");
const Router = require("./Router.js");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("", Router);
app.listen(PORT, () => {
    console.log(`Working on port ${PORT}`);
});
