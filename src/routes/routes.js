const { Router } = require("express");
const UserController = require("../controllers/user-controller");
const ReceitaController = require("../controllers/receita-controller");
const CategoriaController = require("../controllers/categoria-controller");
const verificar = require("../middleware/verificar");
const routes = Router();

routes.get("/", (req, res) => {
  // #swagger.tags = ['Principal']
  res.status(200).json({ mensagem: "Bem-Vindo a API HealthLAB 4.0" });
});

routes.get("/verificar", verificar, (req, res) => {
  // #swagger.tags = ['Autenticação']
  res.status(200).json({ mensagem: "Essa é uma rota com o usuário logado" });
});

//Rota Login
routes.post(
  // #swagger.tags = ['Autenticação']
  "/login",
  UserController.login
);

//Routes user
routes.get(
  // #swagger.tags = ['Usuário']
  // #swagger.description = 'Uma rota que retorna todos os usuários'
  "/users",
  UserController.getAll
);
routes.get(
  // #swagger.tags = ['Usuário']
  // #swagger.description = 'Uma rota que retorna um usuário pelo id'
  "/user/:id",
  UserController.getOne
);
routes.post(
  // #swagger.tags = ['Usuário']
  // #swagger.description = 'Uma rota para cadastrar um usuário'
  "/user",
  UserController.create
);
routes.put(
  // #swagger.tags = ['Usuário']
  // #swagger.description = 'Uma rota para editar um usuário'
  "/user/:id",
  UserController.update
);
routes.delete(
  // #swagger.tags = ['Usuário']
  // #swagger.description = 'Uma rota para deletar um usuário'
  "/user/:id",
  UserController.delete
);
routes.get(
  // #swagger.tags = ['Usuário']
  // #swagger.description = 'Uma rota que retorna um usuário pelo nome'
  "/userName",
  UserController.getAllByNome
);

//Routes receita
routes.get(
  // #swagger.tags = ['Receita']
  // #swagger.description = 'Uma rota que retorna todas os receitas'
  "/receitas",
  ReceitaController.getAll
);
routes.get(
  // #swagger.tags = ['Receita']
  // #swagger.description = 'Uma rota que retorna uma receita pelo id'
  "/receita/:id",
  ReceitaController.getOne
);
routes.post(
  // #swagger.tags = ['Receita']
  // #swagger.description = 'Uma rota para cadastrar uma receita'
  "/receita",
  verificar,
  ReceitaController.create
);
routes.put(
  // #swagger.tags = ['Receita']
  // #swagger.description = 'Uma rota para editar uma receita'
  "/receita/:id",
  verificar,
  ReceitaController.update
);
routes.delete(
  // #swagger.tags = ['Receita']
  // #swagger.description = 'Uma rota para deletar uma receita'
  "/receita/:id",
  verificar,
  ReceitaController.delete
);
routes.get(
  // #swagger.tags = ['Receita']
  // #swagger.description = 'Uma rota que retorna uma receita pelo título'
  "/receitaTitulo",
  ReceitaController.getAllByTitulo
);

//Routes categoria
routes.get(
  // #swagger.tags = ['Categoria']
  // #swagger.description = 'Uma rota que retorna todas os categorias'
  "/categorias",
  CategoriaController.getAll
);
routes.get(
  // #swagger.tags = ['Categoria']
  // #swagger.description = 'Uma rota que retorna uma categoria pelo id'
  "/categoria/:id",
  CategoriaController.getOne
);
routes.post(
  // #swagger.tags = ['Categoria']
  // #swagger.description = 'Uma rota para cadastrar uma categoria'
  "/categoria",
  CategoriaController.create
);
routes.put(
  // #swagger.tags = ['Categoria']
  // #swagger.description = 'Uma rota para editar uma categoria'
  "/categoria/:id",
  CategoriaController.update
);
routes.delete(
  // #swagger.tags = ['Categoria']
  // #swagger.description = 'Uma rota para deletar uma categoria'
  "/categoria/:id",
  CategoriaController.delete
);
routes.get(
  // #swagger.tags = ['Categoria']
  // #swagger.description = 'Uma rota que retorna uma categoria pelo nome'
  "/categoriaName",
  CategoriaController.getAllByNome
);

/* get, put, delete, update FIND */

module.exports = routes;
