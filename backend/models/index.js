const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.json")["development"];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./User")(sequelize, DataTypes);
db.Expense = require("./Expense")(sequelize, DataTypes);
db.Income = require("./Income")(sequelize, DataTypes);
db.BudgetSetting = require("./BudgetSetting")(sequelize, DataTypes);
db.BudgetAllocation = require("./BudgetAllocation")(sequelize, DataTypes);
db.SavingGoal = require("./SavingGoal")(sequelize, DataTypes);

// Jalankan associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
