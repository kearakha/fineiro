const { Expense, Income } = require('../models');
const { processRecurringTransactions } = require('../utils/recurringCron');

// Get combined transaction history
exports.getAllTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Auto-process recurring transactions strictly before serving history
    await processRecurringTransactions(userId);
    
    // Fetch all incomes and expenses
    const incomes = await Income.findAll({ where: { userId } });
    const expenses = await Expense.findAll({ where: { userId } });
    
    // Format them with a 'type' flag
    const formattedIncomes = incomes.map(item => ({
      ...item.toJSON(),
      type: 'income'
    }));
    
    const formattedExpenses = expenses.map(item => ({
      ...item.toJSON(),
      type: 'expense'
    }));
    
    // Combine and sort by date descending
    const allTransactions = [...formattedIncomes, ...formattedExpenses];
    allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    res.json(allTransactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
