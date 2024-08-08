// types/next-auth.d.ts

import { DefaultSession, DefaultUser } from "next-auth";

// Extend the default User type
declare module "next-auth" {
    interface User extends DefaultUser {
        id: string;
        firstname: string;
        lastname: string;
        username: string;
    }

    interface Session {
        user: {
            id: string;
            firstname: string;
            lastname: string;
            username: string;
        } & DefaultSession["user"];
    }
}

// Extend JWT type
declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        firstname: string;
        lastname: string;
        username: string;
    }
}
