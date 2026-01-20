import jwt from "jsonwebtoken";
import { AppError } from "./errorHandler.js";
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";
export const protect = (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            throw new AppError("Authorization required to access this node.", 401);
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        next(new AppError("Invalid or expired transmission token.", 401));
    }
};
export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            throw new AppError("Insufficient clearance level for this operation.", 403);
        }
        next();
    };
};
//# sourceMappingURL=auth.middleware.js.map