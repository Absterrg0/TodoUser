import { NextRequest, NextResponse } from "next/server";
import client from '@/db'
import { todoSchema } from "@/validate";
import axios from 'axios'
export async function GET(){
    const body = await client.todo.findMany({})
    return NextResponse.json({
        body
    })
}

export async function POST(req:NextRequest){

    try{
        const body = await req.json();
        todoSchema.parse(body);
        const todo = await client.todo.create({
            data:{
                title:body.title,
                description:body.description,
                iscomplete:false,
                userid:body.userid
                
            }
        })
        return NextResponse.json({
            msg:"Todo successfully created"
        })
    }catch(e){
        console.error(e);
        return NextResponse.json({
            msg:"Error creating todo"
        })
    }

}