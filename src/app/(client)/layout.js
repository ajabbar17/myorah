import { Geist, Geist_Mono,Assistant } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const assistant = Assistant({ 
  variable: "--font-assistant",
  subsets: ["latin"],
  weights: [200,300, 400, 500,600,700],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${assistant.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
        <Navbar />
        {children}
        <Footer />
        </CartProvider>
      </body>

    </html>
  );
}
