const express = require('express');
const router = express.Router();

// Import Controllers
const loginController = require('../controllers/loginController');

// Routes
router.get("/", publicController.home);
router.get("/login/", loginController.login);

module.exports = router;
