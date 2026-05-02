const express = require("express");
const router = express.Router();

// Route
const gameControllers = require("../controllers/gameControllers");
router.get("/", gameControllers.gameGet);
router.post("/", gameControllers.gamePost);
router.get("/add-fake", gameControllers.addFakeGet);
router.post("/add-fake", gameControllers.addFakePost);

module.exports = router;