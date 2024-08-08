import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import client from '@/db'; // Ensure this path is correct
import bcrypt from 'bcrypt';

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'Enter Username' },
                password: { label: 'Password', type: 'password', placeholder: 'Enter Password' }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    throw new Error("Missing username or password");
                }

                try {
                    const user = await client.user.findFirst({
                        where: {
                            username: credentials.username
                        }
                    });

                    if (!user) {
                        throw new Error("No user found with this username");
                    }

                    const isValidPassword = await bcrypt.compare(credentials.password, user.password);
                    if (!isValidPassword) {
                        throw new Error("Invalid Password");
                    }

                    return {
                        id: user.id.toString(),
                        firstname: user.firstname,
                        lastname: user.lastname,
                        username: user.username
                    };
                } catch (e) {
                    console.error(e);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/signin' // Path to the custom sign-in page
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.firstname = user.firstname;
                token.lastname = user.lastname;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.id,
                    firstname: token.firstname,
                    lastname: token.lastname,
                    username: token.username
                };
            }
            return session;
        }
    }
};

export default authOptions;
