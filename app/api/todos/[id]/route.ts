import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import client from '@/db';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    const todoId = parseInt(params.id);
    if (isNaN(todoId)) {
        return NextResponse.json({ msg: "Invalid ID" }, { status: 400 });
    }

    try {
        const updatedTodo = await client.todo.update({
            where: {
                id: todoId,
                userid: parseInt(session.user.id),
            },
            data: {
                iscomplete: true,
            },
        });
        return NextResponse.json(updatedTodo);
    } catch (e) {
        console.error('Error updating todo:', e);
        return NextResponse.json({ msg: "Error updating todo" }, { status: 500 });
    }
}
