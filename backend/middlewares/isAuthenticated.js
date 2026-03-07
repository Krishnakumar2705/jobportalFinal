import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        console.log("==> [Auth] Checking authentication...");
        
        const token = req.cookies.token;
        if (!token) {
            console.log("==> [Auth] No token found in cookies");
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        }
        
        console.log("==> [Auth] Token found, verifying...");
        
        if (!process.env.SECRET_KEY) {
            console.error("==> [Auth] SECRET_KEY not found in environment variables");
            return res.status(500).json({
                message: "Server configuration error",
                success: false
            });
        }
        
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            console.log("==> [Auth] Token verification failed");
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        };
        
        req.id = decode.userId;
        console.log("==> [Auth] Authentication successful for user:", decode.userId);
        next();
    } catch (error) {
        console.error("==> [Auth] Authentication error:", error.message);
        return res.status(401).json({
            message: "Authentication failed",
            success: false
        });
    }
}
export default isAuthenticated;