const express = require("express");
const router = express.Router();

// Route
const gameControllers = require("../controllers/gameControllers");
router.get("/", gameControllers.gameGet);
router.get("/add-fake", gameControllers.addFakeGet);
router.post("/add-fake", gameControllers.addFakePost);

module.exports = router;