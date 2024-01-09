import { authOptions } from "@/lib/auth/config";
import { DefaultSession } from "@auth/core/types";
import { DefaultJWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      username: string;
      credits: number;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
