const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        console.log('Attempting to connect to MongoDB...');
        
        // First test with MongoClient
        const client = new MongoClient(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        
        console.log('Testing connection...');
        await client.connect();
        console.log('MongoClient connected successfully');
        await client.close();
        
        // Now connect with mongoose
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB Connection Error Details:');
        console.error(`Error Name: ${error.name}`);
        console.error(`Error Message: ${error.message}`);
        console.error(`Full Error:`, error);
        if (error.code) console.error(`Error Code: ${error.code}`);
        process.exit(1);
    }
};

module.exports = connectDB;