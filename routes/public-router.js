const express = require('express');
const router = express.Router();

// Import Controllers
const loginController = require('../controllers/login-controller');
const publicController = require('../controllers/public-controller');

// Routes
router.get("/", publicController.home);
router.get("/login", loginController.loginGet);
router.post("/login", loginController.loginPost);
router.get("/register", loginController.registerGet);
router.post("/post", loginController.registerPost);

module.exports = router;
