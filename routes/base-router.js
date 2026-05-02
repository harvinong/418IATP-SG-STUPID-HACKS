const express = require('express');
const router = express.Router();

router.get("/", (req, res) => res.send("418 I'm a Teh Poci"));

module.exports = router;
