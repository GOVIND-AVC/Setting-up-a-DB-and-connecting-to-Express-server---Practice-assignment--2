const mongoose = require('mongoose');
require('dotenv').config();

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DATABASE CONNECTED");
    } catch (error) {
        console.log("Database connection error:", error); // Improved error logging
    }
}

module.exports = connectdb;
