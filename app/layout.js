/**
 * app/layout.js
 * Root layout - wraps the app with NextAuth SessionProvider so any
 * client component can call useSession() to read auth state.
 */
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "MeetPlan",
  description: "Your smart meeting planning dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}