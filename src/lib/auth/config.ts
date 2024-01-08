import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { mysqlTable } from "drizzle-orm/mysql-core";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import { db } from "../db";
import { env } from "../env.mjs";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db, mysqlTable) as Adapter,
  callbacks: {
    jwt: ({ account, token, user }) => {
      if (account && user) {
        token.accessToken = account.access_token;
        token.id = user.id;
      }

      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.username,
        },
      };
    },
  },
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/bye",
    error: "/auth/signin",
    newUser: "/auth/setup?goBackTo=/home",
  },
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};
