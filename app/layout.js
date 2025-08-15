import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const inter = Inter({
  subsets: ["latin"],
});


export const metadata = {
  title: "SENSAI",
  description: "AI Powered Career Coach",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{baseTheme:dark}}>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className}   `}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
