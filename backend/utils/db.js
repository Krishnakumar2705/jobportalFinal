import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log("==> [DB] Starting MongoDB connection...");
        
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }
        
        console.log("==> [DB] MONGO_URI found, attempting connection...");
        console.log("==> [DB] Connection string starts with:", process.env.MONGO_URI.substring(0, 20) + "...");
        
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log("==> [DB] ✅ MongoDB connected successfully");
        console.log("==> [DB] Database name:", mongoose.connection.name);
        console.log("==> [DB] Host:", mongoose.connection.host);
    } catch (error) {
        console.error("==> [DB] ❌ MongoDB connection error:");
        console.error("==> [DB] Error name:", error.name);
        console.error("==> [DB] Error message:", error.message);
        if (error.reason) {
            console.error("==> [DB] Error reason:", error.reason);
        }
        throw error;
    }
}
export default connectDB;