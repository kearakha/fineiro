module.exports = (sequelize, DataTypes) => {
  const Income = sequelize.define("Income", {
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isRecurring: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    tableName: 'incomes',
  });

  Income.associate = (models) => {
    Income.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Income;
};
