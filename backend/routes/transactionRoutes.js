const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, transactionController.getAllTransactions);

module.exports = router;
