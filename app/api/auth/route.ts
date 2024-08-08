import client from '@/db'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server';
import { userSchema } from '@/validate';
export async function POST(req:NextRequest){

    try{
        const body = await req.json();
        //validating zod schema
        userSchema.parse(body);
        //hashing the password using bcrypt
        const hashedPassword = await bcrypt.hash(body.password,10)
        const user = await client.user.create({
            
            data:{
                firstname:body.firstname,
                lastname:body.lastname,
                username:body.username,
                password:hashedPassword
            }
        })
        return NextResponse.json({
            msg:"User successfully created"
        })
    }catch(e:any){
        console.error(e);
        if(e.code == 'P2002'){
            return NextResponse.json({
                msg:"User already exists"
            })
        }
        return NextResponse.json({
            msg:"Error creating user"
        })
    }

}