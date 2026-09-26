// This is the backend of the Todo App.
// It is an Express server that stores todos in MongoDB.
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const todoRoutes = require("./routes/todoRoutes");

const app = express();
const PORT = 5000;

// MongoDB connection string (local MongoDB, database name: "todoApp")
const DB_URL = "mongodb://127.0.0.1:27017/todoApp";

// Middleware
app.use(cors());                        // lets the frontend call our API
app.use(express.json());                // lets us read JSON sent by the frontend

// API routes
app.use("/api/todos", todoRoutes);

// Serve the frontend files from the same server
// (so you can also open http://localhost:5000 in the browser)
app.use(express.static(path.join(__dirname, "../frontend")));

// Start the server
async function startServer() {

    try {
        await mongoose.connect(DB_URL);
        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log("Server is running at http://localhost:" + PORT);
        });
    } catch (error) {
        console.log("Could not connect to MongoDB: " + error.message);
        console.log("Make sure MongoDB is running, then try again.");
    }
}

startServer();