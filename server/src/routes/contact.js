import express from "express";
import { prisma } from "../lib/prisma.js";
import { z } from "zod";
import { AppError } from "../middleware/errorHandler.js";
const router = express.Router();
const contactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(10),
});
// POST /api/v1/contact
router.post("/", async (req, res, next) => {
    try {
        const validatedData = contactSchema.parse(req.body);
        const message = await prisma.contactMessage.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                message: validatedData.message,
            }
        });
        console.log("Transmission Received from:", message.name);
        return res.status(201).json({
            status: "success",
            message: "Transmission acknowledged by TZT neural mesh.",
            transmissionId: message.id
        });
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return next(new AppError(error.issues[0]?.message || "Validation Error", 400));
        }
        next(error);
    }
});
export default router;
//# sourceMappingURL=contact.js.map