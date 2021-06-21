const sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Categoria = sequelize.define("Categoria", {
    name: Sequelize.STRING,
  });

  Categoria.associate = (models) => {
    Categoria.hasMany(models.Receita, {
      foreignKey: {
        name: "categoriaId",
      },
    });
  };

  return Categoria;
};
