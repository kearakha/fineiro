module.exports = (sequelize, DataTypes) => {
  const SavingGoal = sequelize.define("SavingGoal", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    targetAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    currentAmount: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    icon: {
      type: DataTypes.STRING,
      defaultValue: '🎯',
    },
  }, {
    tableName: 'saving_goals',
  });

  SavingGoal.associate = (models) => {
    SavingGoal.belongsTo(models.User, { foreignKey: "userId" });
  };

  return SavingGoal;
};
