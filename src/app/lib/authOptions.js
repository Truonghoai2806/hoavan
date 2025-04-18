import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./mongodb";
import jwt from 'jsonwebtoken';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: "openid email profile",
                },
            },
        }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.picture = user.image;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.name = token.name;
            session.user.image = token.picture;
            
            // Tạo JWT token đơn giản hơn
            const payload = {
                id: token.id,
                email: token.email,
                name: token.name
            };
            
            // Sử dụng cùng NEXTAUTH_SECRET key với BE
            session.jwt = jwt.sign(payload, process.env.NEXTAUTH_SECRET);
            return session;
        },
        async signIn({ profile }) {
            if (!profile.email_verified) return false;
            // Optional: chỉ cho domain cụ thể
            // if (!profile.email.endsWith("@yourcompany.com")) return false;
            return true;
        },
    },
    events: {
        error(message) {
            console.error("AUTH ERROR:", message);
        },
    },
    pages: {
        error: "/auth/error",
    },
};
