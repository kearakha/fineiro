const { SavingGoal } = require('../models');

// Get all goals for user
exports.getGoals = async (req, res) => {
  try {
    const goals = await SavingGoal.findAll({ where: { userId: req.user.id } });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new goal
exports.createGoal = async (req, res) => {
  try {
    const { name, targetAmount, currentAmount, deadline, icon } = req.body;
    const goal = await SavingGoal.create({
      name,
      targetAmount,
      currentAmount,
      deadline,
      icon,
      userId: req.user.id
    });
    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update goal amount (add to current)
exports.updateGoalAmount = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body; // amount to add
    const goal = await SavingGoal.findOne({ where: { id, userId: req.user.id } });
    if (!goal) return res.status(404).json({ error: 'Goal not found' });

    goal.currentAmount += parseFloat(amount);
    await goal.save();
    res.json(goal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete goal
exports.deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await SavingGoal.destroy({ where: { id, userId: req.user.id } });
    if (deleted) {
      res.json({ message: 'Goal deleted' });
    } else {
      res.status(404).json({ error: 'Goal not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
