const { Expense, Income, BudgetSetting } = require('../models');

// Calculate Financial Health Score (0-100)
exports.getHealthScore = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Fetch all necessary data
    const incomes = await Income.findAll({ where: { userId } });
    const expenses = await Expense.findAll({ where: { userId } });
    const budget = await BudgetSetting.findOne({ where: { userId } });

    // 2. Base Totals
    const totalIncome = incomes.reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    
    // If no data, return a neutral score
    if (totalIncome === 0 && totalExpense === 0) {
      return res.json({
        score: 50,
        status: 'Neutral',
        message: 'Add some transactions to see your financial health score!',
        breakdown: { savingRate: 0, budgetAdherence: 0 }
      });
    }

    // 3. Calculation Factors
    
    // Factor A: Saving Rate (Weight: 60%)
    // Ideal: 20% or more of income is saved.
    let savingRateScore = 0;
    if (totalIncome > 0) {
      const savingRate = ((totalIncome - totalExpense) / totalIncome) * 100;
      // Map saving rate to 0-100 score
      // 20% saving rate = 100 score. 0% = 50 score. -20% = 0 score.
      savingRateScore = Math.min(100, Math.max(0, (savingRate * 2.5) + 50));
    } else {
      savingRateScore = 0; // Negative health if only expenses
    }

    // Factor B: Budget Adherence (Weight: 40%)
    // Ideal: Total expense <= Budget Limit
    let budgetScore = 100;
    if (budget && budget.limit > 0) {
      if (totalExpense > budget.limit) {
        // Penalty for overspending
        const overspendRatio = totalExpense / budget.limit;
        budgetScore = Math.max(0, 100 - (overspendRatio - 1) * 100);
      } else {
        // Bonus for staying under budget? Let's stay at 100 if under.
        budgetScore = 100;
      }
    } else {
      budgetScore = 70; // Neutral if no budget set
    }

    // 4. Final Weighted Score
    const finalScore = Math.round((savingRateScore * 0.6) + (budgetScore * 0.4));

    // 5. Determine Status & Message
    let status = 'Fair';
    let message = 'Your financial health is okay, but could be better.';

    if (finalScore >= 80) {
      status = 'Excellent';
      message = 'Fantastic job! You are managing your finances perfectly.';
    } else if (finalScore >= 60) {
      status = 'Good';
      message = 'Greate progress. Keep maintaining your savings.';
    } else if (finalScore < 40) {
      status = 'Poor';
      message = 'Your spending is high. Try to cut down and increase your savings.';
    }

    res.json({
      score: finalScore,
      status,
      message,
      breakdown: {
        savingRate: Math.round(savingRateScore),
        budgetAdherence: Math.round(budgetScore)
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
