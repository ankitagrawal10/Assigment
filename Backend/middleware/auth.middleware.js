import jwt from 'jsonwebtoken';
import User from '../model/user.js';

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Token is not provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        console.log('Decoded token:', decoded);

        req.user = await User.findById(decoded.userId);
        console.log('User from DB:', req.user);

        if (!req.user) {
            return res.status(404).json({ message: "User not found" });
        }

        next();
    } catch (error) {
        console.error("Auth middleware error:", error.message);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

export default authMiddleware;
