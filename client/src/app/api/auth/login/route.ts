import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validatedData = loginSchema.parse(body);

        const user = await prisma.user.findUnique({
            where: { email: validatedData.email },
        });

        if (!user || !user.password) {
            return NextResponse.json(
                { message: "Invalid credentials provided to the mesh." },
                { status: 401 }
            );
        }

        const isPasswordValid = await bcrypt.compare(
            validatedData.password,
            user.password
        );

        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid credentials provided to the mesh." },
                { status: 401 }
            );
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            {
                expiresIn: "24h",
            }
        );

        return NextResponse.json(
            {
                status: "success",
                token,
                data: {
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    },
                },
            },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: error.issues[0]?.message || "Validation Error" },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { message: "Internal Neural Error" },
            { status: 500 }
        );
    }
}
