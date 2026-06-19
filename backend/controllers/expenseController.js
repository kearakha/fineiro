const { Expense } = require('../models');

// Get all expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({ where: { userId: req.user.id } });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new expense
exports.createExpense = async (req, res) => {
  try {
    const { amount, category, description, date, isRecurring } = req.body;
    const expense = await Expense.create({ 
      amount, 
      category, 
      description, 
      date,
      isRecurring: isRecurring || false,
      userId: req.user.id 
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an expense
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, category, description, date } = req.body;
    const expense = await Expense.findOne({ where: { id, userId: req.user.id } });
    
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    await expense.update({ amount, category, description, date });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOne({ where: { id, userId: req.user.id } });
    
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    await expense.destroy();
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};