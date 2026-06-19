module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: "users",
  });

  User.associate = (models) => {
    User.hasMany(models.Expense, { foreignKey: "userId" });
    User.hasMany(models.Income, { foreignKey: "userId" });
    User.hasMany(models.BudgetAllocation, { foreignKey: "userId" });
    User.hasOne(models.BudgetSetting, { foreignKey: "userId" });
  };

  return User;
};
