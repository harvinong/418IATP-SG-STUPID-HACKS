const session = require("express-session");
const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

// Temp
const scraper  = require("./scrape/scraper")
const postModel = require("./models/postModel")

const server = express();

dotenv.config({ path: "./.env" });

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


// Server Logic END ===
async function startServer() {
    const hostname = "127.0.0.1";
    const port = 8000;

    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}

async function connectDB() {
    try {
        // connecting to Database with our config.env file and DB is constant in config.env
        await mongoose.connect(process.env.DB_MONGODB_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}


connectDB().then(startServer);