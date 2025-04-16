import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./mongodb";

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
                token.phone = user.phone || null;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.name = token.name;
            session.user.image = token.picture;
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
