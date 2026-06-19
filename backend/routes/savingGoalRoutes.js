const express = require('express');
const router = express.Router();
const savingGoalController = require('../controllers/savingGoalController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, savingGoalController.getGoals);
router.post('/', authMiddleware, savingGoalController.createGoal);
router.patch('/:id/add', authMiddleware, savingGoalController.updateGoalAmount);
router.delete('/:id', authMiddleware, savingGoalController.deleteGoal);

module.exports = router;
