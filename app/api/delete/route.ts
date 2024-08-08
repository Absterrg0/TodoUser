import { NextRequest, NextResponse } from "next/server";
import client from '@/db';
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

export async function DELETE(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const userid = url.searchParams.get("userid");
    
    if (!userid) {
        return NextResponse.json({ msg: "User ID required" }, { status: 400 });
    }

    try {
        await client.todo.deleteMany({
            where: {
                userid: parseInt(userid)
            }
        });
        return NextResponse.json({ msg: "Todos deleted" });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ msg: "Error deleting todos" }, { status: 500 });
    }
}
