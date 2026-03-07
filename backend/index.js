import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

console.log("==> Starting application...");

// Load environment variables
dotenv.config({});
console.log("==> Environment variables loaded");
console.log("==> MONGO_URI exists:", !!process.env.MONGO_URI);
console.log("==> PORT:", process.env.PORT || "not set");
console.log("==> SECRET_KEY exists:", !!process.env.SECRET_KEY);

const app = express();

console.log("==> Express app created");

// middleware
try {
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(cookieParser());
    console.log("==> Basic middleware configured");
} catch (error) {
    console.error("==> Error setting up basic middleware:", error);
    process.exit(1);
}

const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials:true
}

try {
    app.use(cors(corsOptions));
    console.log("==> CORS configured with origin:", corsOptions.origin);
} catch (error) {
    console.error("==> Error setting up CORS:", error);
    process.exit(1);
}

const PORT = process.env.PORT || 3000;
console.log("==> Server will run on PORT:", PORT);

// Health check endpoint
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Job Portal API is running"
    });
});
console.log("==> Health check endpoint registered");

// api's
try {
    app.use("/api/v1/user", userRoute);
    console.log("==> User routes registered");
    
    app.use("/api/v1/company", companyRoute);
    console.log("==> Company routes registered");
    
    app.use("/api/v1/job", jobRoute);
    console.log("==> Job routes registered");
    
    app.use("/api/v1/application", applicationRoute);
    console.log("==> Application routes registered");
} catch (error) {
    console.error("==> Error registering routes:", error);
    process.exit(1);
}

// Global error handler
app.use((err, req, res, next) => {
    console.error("==> Global error handler caught:", err);
    res.status(500).json({
        success: false,
        message: err.message || "Internal server error"
    });
});

// Start server and connect to database
const startServer = async () => {
    try {
        console.log("==> Attempting to connect to MongoDB...");
        await connectDB();
        console.log("==> MongoDB connected successfully!");
        
        console.log("==> Starting Express server...");
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`==> ✅ Server running successfully on port ${PORT}`);
            console.log(`==> Server is ready to accept connections`);
        });
    } catch (error) {
        console.error("==> ❌ Failed to start server:");
        console.error("==> Error name:", error.name);
        console.error("==> Error message:", error.message);
        console.error("==> Error stack:", error.stack);
        process.exit(1);
    }
};

console.log("==> Calling startServer()...");
startServer();