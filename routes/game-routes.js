const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// Route
const gameController = require("../controllers/game-controller");
router.get("/", gameController.gameGet);
router.post("/", gameController.gamePost);

// router.get("/add-fake", authMiddleware.isLoggedIn, gameController.addFakeGet);
// router.post("/add-fake", authMiddleware.isLoggedIn, gameController.addFakePost);

// router.get("/add-real", authMiddleware.isLoggedIn, gameController.addRealGet)
// router.post("/add-real", authMiddleware.isLoggedIn, gameController.addRealPost)

// router.get("/saw-real", authMiddleware.isLoggedIn, gameController.addSawRealGet)
// router.post("/saw-real", authMiddleware.isLoggedIn, gameController.addSawRealPost)

router.get("/add-fake", gameController.addFakeGet);
router.post("/add-fake", gameController.addFakePost);

router.get("/add-real", gameController.addRealGet)
router.post("/add-real", gameController.addRealPost)

router.get("/saw-real", gameController.addSawRealGet)
router.post("/saw-real", gameController.addSawRealPost)

module.exports = router;