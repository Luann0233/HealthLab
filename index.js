const express = require("express");
const routes = require("./src/routes/routes");
require("dotenv").config({ path: "./src/config/.env" });

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.listen(3000);
