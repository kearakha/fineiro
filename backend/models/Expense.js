module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define("Expense", {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'other' // default for existing data
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    isRecurring: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    tableName: 'expenses',
  });

  Expense.associate = (models) => {
    Expense.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Expense;
};
