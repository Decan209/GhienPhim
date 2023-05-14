import { loginService } from "@/services/auth.service";
import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email..." },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password...",
        },
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.HOST}/api/v1/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const user = await res.json();
        // Add logic here to look up the user from the credentials supplied
        // const res = await axios.post(`${process.env.host}/api/v1/auth/login`,credentials)
        if (user.status === "failure") {
          throw Error(user.message);
        }
        if (user) {
          // A`ny object returned will be saved in `user` property of the JWT`
          return user;
        } else {
          return null;
          // If you return null then an error will be displayed advising the user to check their details.
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  baseUrl: 'https://ghien-phim.vercel.app',
  
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/auth/Login",
  },
  secret: process.env.NEXTAUTH_URL,
});
