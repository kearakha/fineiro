const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const auth = require('../middleware/authMiddleware');

router.get('/allocations', auth, budgetController.getAllocations);
router.post('/allocations', auth, budgetController.saveAllocations);

module.exports = router;
