import Sidebar from "@/components/Sidebar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TopMenu from "@/components/TopMenu";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wblow app",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <Sidebar />
        </div>
        <div>
          <div>
            <TopMenu />
          </div>
          <div>{children}</div>
          <div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
