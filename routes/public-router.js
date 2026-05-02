const express = require('express');
const router = express.Router();

// Import Controllers
const loginController = require('../controllers/loginController');

// Routes
router.use("/", loginController.login);

module.exports = router;
