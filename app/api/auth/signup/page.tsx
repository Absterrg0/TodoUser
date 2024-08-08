"use client"
import axios from 'axios'
import { use, useState } from 'react'
import { useRouter } from "next/navigation";

export default function Signup(){
    const [firstname,setFirstname]=useState("");
    const [lastname,setLastname]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const router = useRouter();
    const handleAlready=()=>{
        router.push('/api/auth/signin')
    }

    return <div className="bg-slate-400 items-center min-h-screen flex justify-center">
        <div className="border rounded-md p-5 m-3 bg-slate-200">
        <h1 className="flex justify-center font-bold text-4xl pb-3">Sign Up</h1>
        <h2 className="text-gray-500 pb-7">Create an account to access all the features</h2>
        
        <div>
                   <div className="p-2 text-l">
            First Name:
        </div>
        <input onChange={(e)=>{
            setFirstname(e.target.value)
        }} type="text" placeholder="First Name" className="w-full p-2" />
        <div className="p-2 text-l">
             Last Name:
        </div>
        <input onChange={(e)=>{
            setLastname(e.target.value)
        }} type="text" className="w-full p-2" placeholder="Last Name" />
        </div>
        <div className="p-2 text-l">
            Username:
        </div>
        <input onChange={(e)=>{
            setUsername(e.target.value)
        }} type="text" className="w-full p-2" placeholder="username" />
        <div className="text-l p-2">
            Password
        </div>
        <input onChange={(e)=>{
            setPassword(e.target.value)
        }} type="password" className="p-2 w-full" placeholder="password" />
        <button onClick={async ()=>{
            const res =  await axios.post("http://localhost:3000/api/auth",{
                firstname,
                lastname,
                username,
                password
            })
            router.push("/")
        }} className="flex justify-center bg-black text-white items-center p-3 w-full rounded-lg mt-7">
            Sign Up
        </button>
        <div className="p-3 flex justify-around">
            <div className="text-gray-700">
                Already have an account?
            </div>
            <button onClick={handleAlready} className="underline cursor-pointer text-blue-600">
                Sign In
            </button>
        </div>
        </div>

    </div>
}