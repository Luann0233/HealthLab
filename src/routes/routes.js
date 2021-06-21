const { Router } = require("express");
const UserController = require("../controllers/user-controller");
const ReceitaController = require("../controllers/receita-controller");
const CategoriaController = require("../controllers/categoria-controller");
const verificar = require("../middleware/verificar");
const routes = Router();

routes.get("/", (req, res) => {
  res.status(200).json({ mensagem: "Bem-Vindo a API HealthLAB 4.0" });
});

routes.get("/verificar", verificar, (req, res) => {
  res.status(200).json({ mensagem: "Essa é uma rota com o usuário logado" });
});

//Rota Login
routes.post("/login", UserController.login);

//Routes user
routes.get("/users", UserController.getAll);
routes.get("/user/:id", UserController.getOne);
routes.post("/user", UserController.create);
routes.put("/user/:id", UserController.update);
routes.delete("/user/:id", UserController.delete);
routes.get("/userName", UserController.getAllByNome);

//Routes receita
routes.get("/receitas", ReceitaController.getAll);
routes.get("/receita/:id", ReceitaController.getOne);
routes.post("/receita", verificar, ReceitaController.create);
routes.put("/receita/:id", verificar, ReceitaController.update);
routes.delete("/receita/:id", verificar, ReceitaController.delete);
routes.get("/receitaTitulo", ReceitaController.getAllByTitulo);

//Routes categoria
routes.get("/categorias", CategoriaController.getAll);
routes.get("/categoria/:id", CategoriaController.getOne);
routes.post("/categoria", CategoriaController.create);
routes.put("/categoria/:id", CategoriaController.update);
routes.delete("/categoria/:id", CategoriaController.delete);
routes.get("/categoriaName", CategoriaController.getAllByNome);

/* get, put, delete, update FIND */

module.exports = routes;
