export const dynamic = "force-dynamic";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TopMenu from "@/components/TopMenu";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NextAuthProvider from "@/provider/NextAuthProvider";
import ReduxProvider from "@/redux/ReduxProvider";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <NextAuthProvider session={session}>
            <TopMenu />
            {children}
            {/* <Footer /> */}
          </NextAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
