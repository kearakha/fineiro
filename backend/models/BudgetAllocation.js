module.exports = (sequelize, DataTypes) => {
  const BudgetAllocation = sequelize.define("BudgetAllocation", {
    category: { type: DataTypes.STRING, allowNull: false },
    percentage: { type: DataTypes.FLOAT, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
  }, {
    tableName: 'budget_allocations',
  });

  BudgetAllocation.associate = (models) => {
    BudgetAllocation.belongsTo(models.User, { foreignKey: "userId" });
  };

  return BudgetAllocation;
};
