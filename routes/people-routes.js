const express = require('express');
const router = express.Router();
const peopleController = require('../controllers/people-controllers');

// Route to display the main input form and the list of entered people
router.get('/', peopleController.homeGet );

// Route to process the form submission
router.post('/' , peopleController.homePost);

module.exports = router;
