/**
 * app/api/auth/[...nextauth]/route.js
 * Next.js App Router NextAuth handler.
 * Handles all /api/auth/* routes (sign-in, callback, sign-out, etc.)
 */
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };