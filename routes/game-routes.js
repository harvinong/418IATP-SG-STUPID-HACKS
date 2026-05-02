const express = require("express");
const router = express.Router();

// Route
const gameController = require("../controllers/game-controller");
router.get("/", gameController.gameGet);

router.get("/add-fake", gameController.addFakeGet);
router.post("/add-fake", gameController.addFakePost);

router.get("/add-real", gameController.addRealGet)
router.post("/add-real", gameController.addRealPost)

router.get("/saw-real", gameController.addSawRealGet)
router.post("/saw-real", gameController.addSawRealPost)

module.exports = router;