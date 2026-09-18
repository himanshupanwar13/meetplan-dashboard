/**
 * lib/auth.js
 * NextAuth.js configuration - Google OAuth + Calendar scope.
 * Handles server-side tokens, token refresh, and strict separation
 * from client-side session data.
 */
import Google from "next-auth/providers/google";

const GoogleProvider = typeof Google === "function" ? Google : Google.default;

/**
 * Request a new access token from Google using the refresh token.
 * This runs strictly server-side.
 */
export async function refreshGoogleAccessToken(token) {
  try {
    const url = "https://oauth2.googleapis.com/token";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      // Default Google access token expiry is 3600 seconds (1 hour)
      expiresAt: Math.floor(Date.now() / 1000) + (refreshedTokens.expires_in || 3600),
      // Fallback to old refresh token if Google didn't return a new one
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
      scope: refreshedTokens.scope ?? token.scope,
      error: null,
    };
  } catch (error) {
    console.error("Failed to refresh Google OAuth access token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          // Explicit Google Calendar read-only scope + standard profile
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar.readonly",
          // Force offline access and consent prompt so Google issues a refresh token
          access_type: "offline",
          prompt: "consent",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    /**
     * Persist OAuth tokens securely inside the server-side encrypted JWT.
     * Checks expiration and refreshes if necessary.
     */
    async jwt({ token, account, user }) {
      // Initial sign-in: capture tokens from Google account response
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          expiresAt: account.expires_at,
          scope: account.scope,
          user,
        };
      }

      // Check if access token is still valid (with 60-second safety buffer)
      if (token.expiresAt && Date.now() < token.expiresAt * 1000 - 60000) {
        return token;
      }

      // Access token has expired, refresh it using the refresh token
      if (token.refreshToken) {
        return await refreshGoogleAccessToken(token);
      }

      return token;
    },

    /**
     * Session callback: ONLY exposes safe user identity (name, email, image)
     * to the client browser. Never exposes the access token or refresh token.
     */
    async session({ session, token }) {
      if (token.error) {
        session.error = token.error;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};