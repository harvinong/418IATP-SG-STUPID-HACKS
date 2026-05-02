const express = require('express');
const router = express.Router();

// Subroutes
const publicRouter = require('./public-router');
const gameRouter = require('./game-routes');

router.use("/", publicRouter);
router.use("/game", gameRouter);

router.all(/_*/g, (req, res) => res.status(404).send("<h1>404 Not found</h1><p>This message is crafted with love by <strong>418 I'm a Teh Poci</strong> 🥰🥰🥰😻</p>"));

module.exports = router;
