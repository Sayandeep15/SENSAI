// 

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "SENSAI",
  description: "AI Powered Career Coach",
};

export default function RootLayout({ children }) {
  return (
    // ✅ Move <html> and <body> OUTSIDE ClerkProvider
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* ✅ ClerkProvider should wrap the actual app, not the <html> tag */}
        <ClerkProvider appearance={{ baseTheme: dark }}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />
            <Footer />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
   