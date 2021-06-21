const sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    name: Sequelize.STRING,
    userName: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: Sequelize.STRING,
  });

  User.associate = (models) => {
    User.hasMany(models.Receita, {
      foreignKey: {
        name: "userId",
      },
    });
  };

  return User;
};
