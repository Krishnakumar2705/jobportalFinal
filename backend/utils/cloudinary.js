import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";

console.log("==> [Cloudinary] Loading configuration...");
dotenv.config();

console.log("==> [Cloudinary] CLOUD_NAME exists:", !!process.env.CLOUD_NAME);
console.log("==> [Cloudinary] API_KEY exists:", !!process.env.API_KEY);
console.log("==> [Cloudinary] API_SECRET exists:", !!process.env.API_SECRET);

try {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });
    console.log("==> [Cloudinary] ✅ Configuration successful");
} catch (error) {
    console.error("==> [Cloudinary] ❌ Configuration error:", error.message);
}

export default cloudinary;