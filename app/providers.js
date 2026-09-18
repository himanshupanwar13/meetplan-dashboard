/**
 * app/providers.js
 * Client-side providers wrapper.
 * We isolate "use client" here so the root layout stays a Server Component.
 */
"use client";

import { SessionProvider } from "next-auth/react";

export default function Providers({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}