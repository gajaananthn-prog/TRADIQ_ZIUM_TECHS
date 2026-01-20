import express from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import "express-async-errors";
import morgan from "morgan";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.js";
import contactRoutes from "./routes/contact.js";
import userRoutes from "./routes/users.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// Security Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later."
});
app.use("/api/", limiter);
// Health Check & Config
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});
app.get("/api/v1/config", (req, res) => {
    res.status(200).json({
        appName: "TRADIQ ZIUM TECHS",
        version: "2.0.0-neural",
        environment: process.env.NODE_ENV || "development"
    });
});
// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/users", userRoutes);
// Global Error Handler
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`[TZT-SERVER] Node mesh active on port ${PORT}`);
});
//# sourceMappingURL=index.js.map