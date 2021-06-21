const { User, Receita, Categoria } = require("../models");
const { Op } = require("sequelize");

class ReceitaController {
  /* DEFINIR MÉTODOS */
  async create(req, res) {
    try {
      let userResult = await User.findByPk(req.body.userId);
      let categoriaResult = await Categoria.findByPk(req.body.categoriaId);

      console.log(req.body);

      if (!userResult || !categoriaResult) {
        throw new Error("Usuário ou Categoria não existe!");
      } else {
        const receita = {
          titulo: req.body.titulo,
          descricao: req.body.descricao,
          userId: userResult["dataValues"]["id"],
          categoriaId: categoriaResult["dataValues"]["id"],
        };
        console.log(receita);
        const receitaResult = await Receita.create(receita);
        // await receitaResult.setUser(userResult);
        // await receitaResult.setCategoria(categoriaResult);
        return res.status(200).json(receitaResult);
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err.mesage });
    }
  }

  async getAll(req, res) {
    try {
      /* fazer algum tratamento, ALGUMA REGRA DE NEGÓCIO */
      const receitas = await Receita.findAll({
        include: [
          {
            model: User,
          },
          {
            model: Categoria,
          },
        ],
      });
      return res.status(200).json(receitas);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
    }
  }

  async getOne(req, res) {
    try {
      const receita = await Receita.findByPk(req.params.id);
      if (receita) return res.status(200).json(receita);
      else return res.status(200).json({ mensagem: "Receita não encontrada" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const receita = await Receita.findByPk(req.params.id);
      if (receita) {
        /* req.body
            { nome, titulos, dataFundacao } */
        await receita.update(req.body);
        return res.status(200).json(receita);
      } else {
        return res
          .status(200)
          .json({ mensagem: "Receita não encontrada para atualizar!" });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const receita = await Receita.findByPk(req.params.id);
      if (receita) {
        await receita.destroy();
        return res.status(200).json(receita);
      } else {
        return res
          .status(200)
          .json({ mensagem: "Receita não encontrada para deletar!" });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
    }
  }

  async getAllByTitulo(req, res) {
    let titulo = "%" + req.query.titulo + "%";
    try {
      const receitas = await Receita.findAll({
        where: {
          titulo: {
            [Op.like]: titulo,
            // [Op.eq]: //
          },
        },
      });

      if (receitas) return res.status(200).json(receitas);
      else
        return res
          .status(200)
          .json({ mensagem: "Não foram encontradas Receitas" });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new ReceitaController();
