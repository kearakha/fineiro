const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/incomeController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, incomeController.getAllIncomes);
router.post('/', auth, incomeController.createIncome);
router.put('/:id', auth, incomeController.updateIncome);
router.delete('/:id', auth, incomeController.deleteIncome);

module.exports = router;
