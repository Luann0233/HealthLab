const { User } = require("../models");
const { Op } = require("sequelize");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  /* DEFINIR MÉTODOS */
  // async create(req, res) {
  //   try {
  //     console.log(req.body);
  //     const user = {
  //       name: req.body.name,
  //       userName: req.body.userName,
  //       email: req.body.email,
  //       password: req.body.password,
  //     };
  //     const userResult = await User.create(user);
  //     return res.status(200).json(userResult);
  //   } catch (err) {
  //     return res.status(400).json({ error: err.mesage });
  //   }
  // }

  async create(req, res) {
    try {
      const user = {
        name: req.body.name,
        userName: req.body.userName,
        email: req.body.email,
        // password: req.body.password,
      };
      const hashedSenha = await bcrypt.hash(req.body.password, 10);
      user.password = hashedSenha;
      const userResult = await User.create(user);
      return res.status(200).json(userResult);
    } catch (err) {
      // console.log(err);
      return res.status(400).json({ error: err });
    }
  }

  async getAll(req, res) {
    try {
      /* fazer algum tratamento, ALGUMA REGRA DE NEGÓCIO */
      const users = await User.findAll();
      return res.status(200).json(users);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
    }
  }

  async getOne(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) return res.status(200).json(user);
      else return res.status(200).json({ mensagem: "Usuário não encontrado" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        /* req.body
            { nome, titulos, dataFundacao } */
        await user.update(req.body);
        return res.status(200).json(user);
      } else {
        return res
          .status(200)
          .json({ mensagem: "Usuário não encontrado para atualizar" });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        await user.destroy();
        return res.status(200).json(user);
      } else {
        return res
          .status(200)
          .json({ mensagem: "Usuário não encontrado para deletar" });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
    }
  }

  async getAllByNome(req, res) {
    let name = "%" + req.query.name + "%";
    try {
      const users = await User.findAll({
        where: {
          name: {
            [Op.like]: name,
            // [Op.eq]: //
          },
        },
      });

      if (users) return res.status(200).json(users);
      else
        return res
          .status(200)
          .json({ mensagem: "Não foram encontrados Usuários" });
    } catch (err) {
      console.log(err);
    }
  }

  async login(req, res, next) {
    try {
      const results = await User.findAll({
        where: {
          email: req.body.email,
        },
      });

      if (results.length < 1) {
        return res.status(401).send({ message: "Falha na autenticação" });
      }

      if (
        await bcrypt.compareSync(
          req.body.password,
          results[0].dataValues.password
        )
      ) {
        const token = jwt.sign(
          {
            userId: results[0].dataValues.id,
            email: results[0].dataValues.email,
          },
          process.env.ACCESS_SECRET,
          {
            expiresIn: 300,
          }
        );
        return res.status(200).send({
          message: "Autenticado com sucesso",
          token: token,
        });
      }
      return res.status(401).send({ message: "Falha na autenticação" });
    } catch (error) {
      return res.status(500).send({ message: "Falha na autenticação" });
    }
  }
}
module.exports = new UserController();
