const { Categoria } = require("../models");
const { Op } = require("sequelize");

class CategoriaController {
  /* DEFINIR MÉTODOS */
  async create(req, res) {
    try {
      const categoria = {
        name: req.body.name,
      };
      const categoriaResult = await Categoria.create(categoria);
      return res.status(200).json(categoriaResult);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err.mesage });
    }
  }

  async getAll(req, res) {
    try {
      /* fazer algum tratamento, ALGUMA REGRA DE NEGÓCIO */
      const categorias = await Categoria.findAll();
      return res.status(200).json(categorias);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
    }
  }

  async getOne(req, res) {
    try {
      const categoria = await Categoria.findByPk(req.params.id);
      if (categoria) return res.status(200).json(categoria);
      else
        return res.status(200).json({ mensagem: "Categoria não encontrada" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const categoria = await Categoria.findByPk(req.params.id);
      if (categoria) {
        /* req.body
            { nome, titulos, dataFundacao } */
        await categoria.update(req.body);
        return res.status(200).json(categoria);
      } else {
        return res
          .status(200)
          .json({ mensagem: "Categoria não encontrada para atualizar!" });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const categoria = await Categoria.findByPk(req.params.id);
      if (categoria) {
        await categoria.destroy();
        return res.status(200).json(categoria);
      } else {
        return res
          .status(200)
          .json({ mensagem: "Categoria não encontrada para deletar!" });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
    }
  }

  async getAllByNome(req, res) {
    let name = "%" + req.query.name + "%";
    try {
      const categorias = await Categoria.findAll({
        where: {
          name: {
            [Op.like]: name,
            // [Op.eq]: //
          },
        },
      });

      if (categorias) return res.status(200).json(categorias);
      else
        return res
          .status(200)
          .json({ mensagem: "Não foram encontradas Categorias" });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new CategoriaController();
