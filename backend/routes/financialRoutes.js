const express = require('express');
const router = express.Router();
const financialController = require('../controllers/financialController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/health', authMiddleware, financialController.getHealthScore);

module.exports = router;
