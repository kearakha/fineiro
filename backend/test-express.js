const express = require('express');
const app = express();
const listEndpoints = require('express-list-endpoints');
const router = express.Router();
router.get('/test', (req, res) => res.send('ok'));
app.use('/api', router);
console.log(listEndpoints(app));
