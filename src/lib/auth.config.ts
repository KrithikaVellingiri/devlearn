import type { NextAuthOptions } from "next-auth";

/**
 * Centralised NextAuth configuration.
 *
 * Providers are intentionally left as placeholders —
 * add GitHub, Google, or Credentials providers here when ready.
 *
 * Docs: https://next-auth.js.org/configuration/options
 */
export const authConfig: NextAuthOptions = {
  /**
   * Add providers here.
   *
   * Example (GitHub):
   *   import GitHubProvider from "next-auth/providers/github";
   *   providers: [
   *     GitHubProvider({
   *       clientId: process.env.GITHUB_CLIENT_ID!,
   *       clientSecret: process.env.GITHUB_CLIENT_SECRET!,
   *     }),
   *   ],
   */
  providers: [],

  /**
   * Custom sign-in page (optional — remove to use the built-in Next-Auth UI)
   */
  pages: {
    signIn: "/login",
  },

  /**
   * JWT strategy is the default for App Router projects.
   * Switch to "database" when you add Prisma/Drizzle.
   */
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    /**
     * Extend the JWT token with custom user fields.
     * Add `user.id`, `user.role`, etc. here as your schema grows.
     */
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    /**
     * Expose custom fields to the client session object.
     */
    async session({ session, token }) {
      if (session.user && token.id) {
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },

  /**
   * Must be set in production. Use NEXTAUTH_SECRET in .env.local
   */
  secret: process.env.NEXTAUTH_SECRET,

  debug: process.env.NODE_ENV === "development",
};
