"use strict";

const bcrypt = require("bcrypt");

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

module.exports = {
  async up(queryInterface) {
    const hash = await bcrypt.hash("demo1234", 10);

    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Demo User",
          email: "demo@example.com",
          password: hash,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );

    const [[user]] = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE email = 'demo@example.com' LIMIT 1`,
    );
    const userId = user.id;

    // --- Incomes (3 months) ---
    await queryInterface.bulkInsert(
      "incomes",
      [
        // Month -2
        {
          userId,
          category: "Salary",
          amount: 8000000,
          description: "Monthly salary",
          date: daysAgo(60),
          isRecurring: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId,
          category: "Investment",
          amount: 500000,
          description: "Dividen saham",
          date: daysAgo(55),
          isRecurring: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Month -1
        {
          userId,
          category: "Salary",
          amount: 8000000,
          description: "Monthly salary",
          date: daysAgo(30),
          isRecurring: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId,
          category: "Bonus",
          amount: 2000000,
          description: "Project bonus",
          date: daysAgo(25),
          isRecurring: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // This month
        {
          userId,
          category: "Salary",
          amount: 8000000,
          description: "Monthly salary",
          date: daysAgo(5),
          isRecurring: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId,
          category: "Investment",
          amount: 750000,
          description: "Reksa dana cair",
          date: daysAgo(3),
          isRecurring: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );

    // --- Expenses (3 months) ---
    await queryInterface.bulkInsert(
      "expenses",
      [
        // Month -2
        {
          userId,
          category: "Rent",
          amount: 1500000,
          description: "Kos bulan ini",
          date: daysAgo(58),
          isRecurring: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId,
          category: "Food & Dining",
          amount: 350000,
          description: "Grocery mingguan",
          date: daysAgo(56),
          isRecurring: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId,
          category: "Transportation",
          amount: 200000,
          description: "Bensin + toll",
          date: daysAgo(54),
          isRecurring: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId,
          category: "Utilities",
          amount: 300000,
          description: "Listrik & air",
          date: daysAgo(52),
          isRecurring: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId,
          category: "Shopping",
          amount: 450000,
          description: "Baju baru",
          date: daysAgo(50),
          isRecurring: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId,
          category: "Food & Dining",
          amount: 280000,
          description: "Makan siang kantor",
          date: daysAgo(48),
          isRecurring: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId,
          category: "Entertainment",
          amount: 150000,
          description: "Netflix + Spotify",
          date: daysAgo(46),
          isRecurring: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Month -1
        {
          userId,
          category: "Rent",
          amount: 1500000,
          description: "Kos bulan ini",
          date: daysAgo(28),
          isRecurring: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId,
          category: "Food & Dining",
          amount: 400000,
          description: "Grocery mingguan",
          date: daysAgo(26),
          isRecurring: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId,
          category: "Transportation",
          amount: 180000,
          description: "Grab & bensin",
          date: daysAgo(24),
          isRecurring: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId,
          category: "Healthcare",
          amount: 250000,
          description: "Vitamin & apotek",
          date: daysAgo(22),
          isRecurring: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId,
          category: "Utilities",
          amount: 320000,
          description: "Listrik & air",
          date: daysAgo(20),
          isRecurring: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId,
          category: "Entertainment",
          amount: 150000,
          description: "Netflix + Spotify",
          date: daysAgo(18),
          isRecurring: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId,
          category: "Food & Dining",
          amount: 320000,
          description: "Makan malam bareng",
          date: daysAgo(16),
          isRecurring: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId,
          category: "Shopping",
          amount: 600000,
          description: "Sepatu baru",
          date: daysAgo(14),
          isRecurring: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // This month
        {
          userId,
          category: "Rent",
          amount: 1500000,
          description: "Kos bulan ini",
          date: daysAgo(7),
          isRecurring: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId,
          category: "Food & Dining",
          amount: 380000,
          description: "Grocery mingguan",
          date: daysAgo(6),
          isRecurring: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId,
          category: "Transportation",
          amount: 150000,
          description: "Bensin",
          date: daysAgo(5),
          isRecurring: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId,
          category: "Entertainment",
          amount: 150000,
          description: "Netflix + Spotify",
          date: daysAgo(4),
          isRecurring: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId,
          category: "Food & Dining",
          amount: 220000,
          description: "Kopi & snack",
          date: daysAgo(2),
          isRecurring: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );

    // --- Budget allocations ---
    await queryInterface.bulkInsert(
      "budget_allocations",
      [
        {
          userId,
          category: "Food & Dining",
          percentage: 25,
          amount: 2000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId,
          category: "Rent",
          percentage: 20,
          amount: 1600000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId,
          category: "Transportation",
          percentage: 10,
          amount: 800000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId,
          category: "Utilities",
          percentage: 8,
          amount: 640000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId,
          category: "Entertainment",
          percentage: 7,
          amount: 560000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId,
          category: "Shopping",
          percentage: 10,
          amount: 800000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId,
          category: "Healthcare",
          percentage: 5,
          amount: 400000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId,
          category: "Savings",
          percentage: 15,
          amount: 1200000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );

    // --- Budget settings ---
    await queryInterface.bulkInsert(
      "budget_settings",
      [
        {
          userId,
          limit: 8000000,
          period: "monthly",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );

    // --- Saving goals ---
    await queryInterface.bulkInsert(
      "saving_goals",
      [
        {
          userId,
          name: "Laptop Baru",
          targetAmount: 15000000,
          currentAmount: 4500000,
          icon: "💻",
          deadline: new Date("2026-12-31"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId,
          name: "Liburan Bali",
          targetAmount: 5000000,
          currentAmount: 4000000,
          icon: "🛫",
          deadline: new Date("2026-09-01"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId,
          name: "Dana Darurat",
          targetAmount: 30000000,
          currentAmount: 8000000,
          icon: "🏦",
          deadline: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(
      `DELETE FROM users WHERE email = 'demo@example.com'`,
    );
  },
};
