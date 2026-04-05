import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

/**
 * Next-Auth App Router handler.
 * Route: /api/auth/* (sign-in, sign-out, callback, session, csrf …)
 *
 * Both GET and POST must be exported from this file.
 */
const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
