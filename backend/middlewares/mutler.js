import multer from "multer";

console.log("==> [Multer] Configuring file upload middleware...");

const storage = multer.memoryStorage();

export const singleUpload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
}).single("file");

console.log("==> [Multer] File upload middleware configured");