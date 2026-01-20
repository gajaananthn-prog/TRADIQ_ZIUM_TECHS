import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const contactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(10),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validatedData = contactSchema.parse(body);

        const message = await prisma.contactMessage.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                message: validatedData.message,
            },
        });

        return NextResponse.json(
            {
                status: "success",
                message: "Transmission acknowledged by TZT neural mesh.",
                transmissionId: message.id,
            },
            { status: 201 }
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
