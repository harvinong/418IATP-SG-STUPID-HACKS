const express = require('express');
const router = express.Router();

router.get("/", (req, res) => res.send("418 I'm a Teh Poci"));

// Subroutes
const publicRouter = require('./public-router');
const gameRouter = require('./game-routes');
router.use("/", publicRouter);
router.use("/game/", gameRouter);

module.exports = router;
