import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeToggle from "@/components/ThemeToggle";
import CursorFollower from "@/components/CursorFollower";
import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import Zium3DCompanion from "@/components/Zium3DCompanion";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TRADIQ ZIUM TECHS | Neural Intelligence SaaS",
  description: "Experience the next dimension of AI-powered software architecture by TZT.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`} suppressHydrationWarning>
        <AuthProvider session={session}>
          <ThemeProvider>
            <SmoothScroll>
              <div className="bg-grid-subtle min-h-screen relative overflow-x-hidden">
                <div className="noise-overlay" />
                <CursorFollower />
                <Zium3DCompanion />
                <div className="content-mesh">
                  <Navbar />
                  {children}
                  <Footer />
                </div>
              </div>
            </SmoothScroll>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
