const { Expense, Income } = require('../models');
const { Op } = require('sequelize');

/**
 * Checks all recurring transactions for a user and clones them 
 * if a month has passed since the original transaction date.
 */
exports.processRecurringTransactions = async (userId) => {
  try {
    const today = new Date();
    
    // We define a window: look for isRecurring = true
    // And their Date is older than 28 days (roughly 1 month)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 28);
    
    // Process Incomes
    const recurringIncomes = await Income.findAll({
      where: {
        userId,
        isRecurring: true,
        date: {
          [Op.lt]: thirtyDaysAgo 
        }
      }
    });

    for (const inc of recurringIncomes) {
      // Create a new record for this month
      const newDate = new Date(inc.date);
      newDate.setMonth(newDate.getMonth() + 1);
      
      // If the new date is still in the past or today, we clone it
      if (newDate <= today) {
        await Income.create({
          userId: inc.userId,
          amount: inc.amount,
          category: inc.category,
          description: inc.description,
          isRecurring: true, // The new one is also recurring
          date: newDate
        });
        
        // Turn off recurring for the old one so it's not cloned again
        inc.isRecurring = false;
        await inc.save();
      }
    }

    // Process Expenses
    const recurringExpenses = await Expense.findAll({
      where: {
        userId,
        isRecurring: true,
        date: {
          [Op.lt]: thirtyDaysAgo
        }
      }
    });

    for (const exp of recurringExpenses) {
      const newDate = new Date(exp.date);
      newDate.setMonth(newDate.getMonth() + 1);
      
      if (newDate <= today) {
        await Expense.create({
          userId: exp.userId,
          amount: exp.amount,
          category: exp.category,
          description: exp.description,
          isRecurring: true,
          date: newDate
        });
        
        exp.isRecurring = false;
        await exp.save();
      }
    }
  } catch (error) {
    console.error("Error processing recurring transactions:", error);
  }
};
