const { BudgetAllocation, BudgetSetting } = require('../models');

// Get all allocations + total budget for user
exports.getAllocations = async (req, res) => {
  try {
    const allocations = await BudgetAllocation.findAll({ where: { userId: req.user.id } });
    const setting = await BudgetSetting.findOne({ where: { userId: req.user.id } });
    
    res.json({
      allocations,
      totalBudget: setting ? setting.limit : 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Save allocations and total budget
exports.saveAllocations = async (req, res) => {
  const { allocations, totalBudget } = req.body;
  const userId = req.user.id;
  
  try {
    // 1. Save Total Budget to BudgetSetting (Update or Create)
    const existingSetting = await BudgetSetting.findOne({ where: { userId } });
    if (existingSetting) {
      existingSetting.limit = totalBudget || 0;
      await existingSetting.save();
    } else {
      await BudgetSetting.create({
        limit: totalBudget || 0,
        period: 'monthly', // default
        userId
      });
    }

    // 2. Overwrite Allocations
    await BudgetAllocation.destroy({ where: { userId } });
    
    if (allocations && allocations.length > 0) {
      const recordsToInsert = allocations.map(item => ({
        ...item,
        userId
      }));
      await BudgetAllocation.bulkCreate(recordsToInsert);
    }
    
    res.status(200).json({ message: "Budget plan saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
