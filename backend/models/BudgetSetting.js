module.exports = (sequelize, DataTypes) => {
  const BudgetSetting = sequelize.define("BudgetSetting", {
    limit: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    period: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'budget_settings',
  });

  BudgetSetting.associate = (models) => {
    BudgetSetting.belongsTo(models.User, { foreignKey: "userId" });
  };

  return BudgetSetting;
};
