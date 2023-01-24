import { getUser } from '@/libs/users';
import validate from '@/services/authService';
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";


export default NextAuth({
    session: {
        maxAge: 60 * 5,
        updateAge: 60 * 10
    },
    jwt: {
        maxAge: 60 * 5
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                const { email, pass } = credentials
                const userDoc = await getUser(email);
                if (userDoc) {
                    const bool = await validate(pass, userDoc.pass)
                    if (bool) {
                        delete userDoc.pass;
                        return userDoc;
                    } else {
                        throw new Error("CREDENTIALS ERROR")
                    }
                }else {
                    throw new Error("USER NOT FOUND")
                }
            }
        })
    ],
    callbacks: {
        async session({ session, user }) {
            if (user && user.id) {
                session.id = user.id
            }
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user && user.id) {
                token.id = user.id
            }
            return token;
        }
    }
})