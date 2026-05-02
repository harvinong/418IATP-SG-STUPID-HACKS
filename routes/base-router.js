const express = require('express');
const router = express.Router();

router.get("/", (req, res) => res.send("418 I'm a Teh Poci"));

// Subroutes
const publicRouter = require('express');
router.use("/", publicRouter);

module.exports = router;
