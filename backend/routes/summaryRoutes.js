const express = require('express');
const router = express.Router();
const summaryController = require('../controllers/summaryController');
const auth = require('../middleware/authMiddleware');

router.get('/summary', auth, summaryController.getSummary);
router.get('/prediction', auth, summaryController.getPrediction);

module.exports = router;
