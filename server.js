const express = require('express');
const session = require('express-session');
const path = require('path');
const Person = require('./models/person-model');

const server = express();

const port = 8000;
const hostname = "localhost";

// Middleware setup
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));
server.use(express.urlencoded({ extended: false }));

// Middleware for session management
server.use(session({
    secret: 'your-secret-key', // It's recommended to use an environment variable for this
    resave: false,
    saveUninitialized: false
}));

/**
 * Middleware to re-instantiate Person objects from the session.
 * When objects are stored in a session, they lose their class prototype.
 * This ensures that the objects have access to methods like `getAge()` and `toString()`.
 */
server.use((req, res, next) => {
    if (req.session.person_arr) {
        req.session.person_arr = req.session.person_arr.map(p => new Person(p.name, p.age));
    }
    next();
});

// Routes
const peopleRoutes = require("./routes/people-routes");
server.use('/', peopleRoutes);

server.listen(port, hostname,() => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
