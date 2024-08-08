import { NextResponse } from 'next/server';
import prisma from '@/db'; // Adjust this path as needed
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    const { firstname, lastname, username, password } = await request.json();

    if (!firstname || !lastname || !username || !password) {
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { username }
        });

        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        await prisma.user.create({
            data: {
                firstname,
                lastname,
                username,
                password: hashedPassword
            }
        });

        return NextResponse.json({ message: 'User created successfully' }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
