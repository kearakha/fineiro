"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("incomes", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      category: { type: Sequelize.STRING, allowNull: false },
      amount: { type: Sequelize.FLOAT, allowNull: false },
      description: { type: Sequelize.STRING, allowNull: true },
      date: { type: Sequelize.DATE, allowNull: false },
      isRecurring: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.createTable("saving_goals", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      name: { type: Sequelize.STRING, allowNull: false },
      targetAmount: { type: Sequelize.FLOAT, allowNull: false },
      currentAmount: { type: Sequelize.FLOAT, defaultValue: 0 },
      deadline: { type: Sequelize.DATE, allowNull: true },
      icon: { type: Sequelize.STRING, defaultValue: "🎯" },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.createTable("budget_allocations", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      category: { type: Sequelize.STRING, allowNull: false },
      percentage: { type: Sequelize.FLOAT, allowNull: false },
      amount: { type: Sequelize.FLOAT, allowNull: false },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("budget_allocations");
    await queryInterface.dropTable("saving_goals");
    await queryInterface.dropTable("incomes");
  },
};
