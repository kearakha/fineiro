require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { sequelize } = require("./models");
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const summaryRoutes = require('./routes/summaryRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const financialRoutes = require('./routes/financialRoutes');
const savingGoalRoutes = require('./routes/savingGoalRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/incomes', incomeRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/financial', financialRoutes);
app.use('/api/savings', savingGoalRoutes);
app.use('/api', summaryRoutes); // Mounts /summary and /prediction under /api
//test db connection
sequelize.authenticate()
  .then(() => {
    console.log("Database connected!");
  })
  .catch(err => {
    console.error("Unable to connect:", err);
  });

//tambah list endpoint
const listEndpoints = require("express-list-endpoints");

//start server
app.listen(PORT, (err) => {
  if (err) {
    console.error("Gagal menjalankan server:", err);
    process.exit(1);
  }
  console.log(`Server running at: http://localhost:${PORT}`);
  
  // log endpoints list
  console.log('Endpoints:', listEndpoints(app));
});
