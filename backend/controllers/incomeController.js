const { Income } = require('../models');

// Get all incomes for a user
exports.getAllIncomes = async (req, res) => {
  try {
    const incomes = await Income.findAll({ where: { userId: req.user.id } });
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new income
exports.createIncome = async (req, res) => {
  try {
    const { amount, category, description, date, isRecurring } = req.body;
    const income = await Income.create({
      amount,
      category,
      description,
      date,
      isRecurring: isRecurring || false,
      userId: req.user.id
    });
    res.status(201).json(income);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an income
exports.updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, category, description, date } = req.body;
    const income = await Income.findOne({ where: { id, userId: req.user.id } });
    
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    await income.update({ amount, category, description, date });
    res.json(income);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an income
exports.deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const income = await Income.findOne({ where: { id, userId: req.user.id } });
    
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    await income.destroy();
    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
