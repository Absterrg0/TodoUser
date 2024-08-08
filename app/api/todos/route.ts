import { NextRequest, NextResponse } from "next/server";
import client from '@/db'
import { todoSchema } from "@/validate";
import axios from 'axios'
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
export async function GET(){
    const session = await getServerSession(authOptions);
    if(!session?.user){
        return NextResponse.json({
            msg:"Unauthorized"
        },
        {
            status:401
        }
    )
    }
    const body = await client.todo.findMany({
        where:{
            userid:parseInt(session.user.id)
        },
        select:{
            id:true,
            title:true,
            description:true,
            iscomplete:true

        }
    })
    return NextResponse.json(
        body
    )
}

export async function POST(req:NextRequest){
    const session = await getServerSession(authOptions);
    if(!session?.user){
        return NextResponse.json({
            msg:"Unauthorized"
        },
        {
            status:401
        }
    )
    }

    try{
        const body = await req.json();
        todoSchema.parse(body);
        const todo = await client.todo.create({
            data:{
                title:body.title,
                description:body.description,
                iscomplete:false,
                userid:parseInt(session.user.id)
                
            }
        })
        return NextResponse.json({
            msg:"Todo successfully created"
        })
    }catch(e){
        console.log(e);
        return NextResponse.json({
            msg:"Error creating todo"
        })
    }

}
