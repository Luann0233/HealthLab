const sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Receita = sequelize.define("Receita", {
    titulo: Sequelize.STRING,
    descricao: Sequelize.STRING,
  });

  Receita.associate = (models) => {
    Receita.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
      },
    });
    Receita.belongsTo(models.Categoria, {
      foreignKey: {
        name: "categoriaId",
      },
    });
  };

  return Receita;
};
