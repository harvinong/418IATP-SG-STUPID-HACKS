const express = require('express');
const session = require('express-session');
const path = require('path');

const server = express();

const port = 8000;
const hostname = "localhost";

// Middleware setup
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));
server.use(express.urlencoded({ extended: false }));

// Middleware for session management
server.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Routes
server.listen(port, hostname,() => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
