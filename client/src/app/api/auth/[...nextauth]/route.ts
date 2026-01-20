import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "TZT Neural Identity",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                try {
                    // Direct database access for optimization (Serverless)
                    const { prisma } = await import("@/lib/prisma"); // Dynamic import to prevent client bundle issues
                    const bcrypt = (await import("bcrypt")).default;
                    const jwt = (await import("jsonwebtoken")).default;

                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email }
                    });

                    if (!user || !user.password) return null;

                    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
                    if (!isPasswordValid) return null;

                    const token = jwt.sign(
                        { id: user.id, email: user.email, role: user.role },
                        process.env.JWT_SECRET || "fallback_secret",
                        { expiresIn: "24h" }
                    );

                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        accessToken: token,
                    };

                } catch (error) {
                    console.error("NextAuth Auth Error:", error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = (user as any).accessToken;
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).accessToken = token.accessToken;
                (session.user as any).role = token.role;
            }
            return session;
        }
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
