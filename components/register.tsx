"use client"
import Form from 'next/form'
import { useRouter } from 'next/navigation'
import { useState, type SetStateAction, useEffect } from 'react'
import { register } from "@/libApi/userApi"
import DataForm from "@/components/DataForm.tsx"
import "@/styles/register.css"

export default function Register()
{
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")

    const router = useRouter()

    const userRegister = async (e: FormData) =>
    {
        const u: string = e.get("username") as string
        const p: string = e.get("password") as string

        if (u === "" || p === "")
        {
            console.log("null value found")
            return
        }

        if (username.length < 3 || username.length > 9)
        {
            console.log("Username must be between 3 to 9 characters.")
            return
        }

        const res = await register(u, p)
        if (res.status !== 200)
        {
            console.log("User was not registered")
        }
        else
        {
            console.log("User was registered")
            router.push("/login")
        }
    }

    return (
        <>
        <div className="registerWindow">
            Register a new user
            <hr/>
            <Form action={userRegister}>
            <DataForm name='username' val={username} setVal={setUsername}/>
            <DataForm name='password' val={password} setVal={setPassword}/>
            <div className='submitButton'>
                <button className='submitButton' type='submit'>Register</button>
            </div>
            </Form>
        </div>
        </>
    )
}