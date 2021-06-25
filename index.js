const express = require("express");
const routes = require("./src/routes/routes");
require("dotenv").config({ path: "./src/config/.env" });
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./src/config/swagger_doc.json");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(3000);
