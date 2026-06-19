const { Expense, Income } = require('../models');
const axios = require('axios');

// Get financial summary
exports.getSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Fetch all incomes and expenses for the user
    const incomes = await Income.findAll({ where: { userId } });
    const expenses = await Expense.findAll({ where: { userId } });
    
    // Calculate totals
    const totalIncome = incomes.reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const balance = totalIncome - totalExpense;

    // Calculate category breakdown for expenses
    const expenseByCategoryMap = {};
    expenses.forEach(exp => {
      expenseByCategoryMap[exp.category] = (expenseByCategoryMap[exp.category] || 0) + exp.amount;
    });

    const expenseByCategory = Object.keys(expenseByCategoryMap).map(cat => ({
      name: cat,
      value: expenseByCategoryMap[cat]
    })).sort((a, b) => b.value - a.value);

    res.json({
      totalIncome,
      totalExpense,
      balance,
      incomeCount: incomes.length,
      expenseCount: expenses.length,
      expenseByCategory
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Trigger ML Prediction
exports.getPrediction = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Fetch user's expenses ordered by date
    const expenses = await Expense.findAll({ 
      where: { userId },
      order: [['date', 'ASC']]
    });
    
    // Format data to send to ML service
    // We send a list of dictionaries with amount, category and date
    const expenseData = expenses.map(exp => ({
      amount: exp.amount,
      category: exp.category,
      date: exp.date.toISOString().split('T')[0] // passing YYYY-MM-DD
    }));

    // Call the ML Service (FastAPI) running on port 8000
    try {
      const mlResponse = await axios.post('http://127.0.0.1:8000/predict', {
        expenses: expenseData
      });
      
      let isOverbudgetWarning = false;
      const predictionTotal = mlResponse.data?.prediction_total || 0;
      
      // Fetch budget setting to compare
      const BudgetSetting = require('../models').BudgetSetting;
      const budget = await BudgetSetting.findOne({ where: { userId } });
      
      if (budget && budget.limit > 0) {
        // Warn if prediction is > 90% of the budget
        if (predictionTotal >= (budget.limit * 0.9)) {
          isOverbudgetWarning = true;
        }
      }
      
      res.json({
        ...mlResponse.data,
        isOverbudgetWarning
      });
    } catch (mlError) {
      console.error("ML Service Error:", mlError.message);
      res.status(503).json({ 
        message: "Machine Learning service is currently unavailable.",
        details: mlError.message
      });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
