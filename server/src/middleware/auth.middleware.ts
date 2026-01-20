import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "./errorHandler.js";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

interface JwtPayload {
    id: string;
    email: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
    try {
        let token: string | undefined;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            throw new AppError("Authorization required to access this node.", 401);
        }

        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        req.user = decoded;

        next();
    } catch (error) {
        next(new AppError("Invalid or expired transmission token.", 401));
    }
};

export const restrictTo = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            throw new AppError("Insufficient clearance level for this operation.", 403);
        }
        next();
    };
};
