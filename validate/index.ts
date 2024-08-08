import { title } from 'process'
import {z} from 'zod'

export const userSchema = z.object({
        firstname : z.string().min(1,"First name is required"),
        lastname : z.string().min(1,"Last name is required"),
        username : z.string().min(1,"User name is required"),
        password: z.string().min(6,"Minimum 6 digit password is required")
    })

export const todoSchema = z.object({
    title:z.string().min(1,"Title is required"),
    description:z.string().min(1,"Description is required"),
    userid:z.string().min(1,"User id is required")
})