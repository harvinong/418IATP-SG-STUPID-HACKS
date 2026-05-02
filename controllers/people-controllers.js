const Person = require('../models/person-model');

exports.homeGet = (req, res) => {
    const person_arr = req.session.person_arr || [];
    res.render('input', { person_arr });
}

// Route to process the form submission
exports.homePost = (req, res) => {
    // Case 1: The "Next" button was clicked
    if (req.body.next) {
        // ### PART A ###
        // Create a new Person object with "name" and "age"
        // passed in the req.body
        // If req.session.person_arr does not exist, create it
        // Add the new Person object to req.session.person_arr

        res.redirect('/');
    }
    // Case 2: The "Find Oldest and Reset" button was clicked
    else if (req.body.find_oldest) {
        // ### PART B ###
        // Retrieve the req.session.person_arr
        // Find the oldest persons (can be more than 1) in the array
        // Remove the person_arr from sesson
        // Render the result template with oldest persons to display them

    } else {
        res.redirect('/');
    }
}
