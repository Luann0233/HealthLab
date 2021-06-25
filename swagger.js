const swaggerAutogen = require("swagger-autogen")();
const outputFile = "./src/config/swagger_doc.json";
const routes = ["./index.js"];

swaggerAutogen(outputFile, routes).then(() => {
  require("./index.js");
});
