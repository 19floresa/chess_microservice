"use client"
import Form from 'next/form'
import { useRouter } from 'next/navigation'
import { useState, type SetStateAction, useEffect } from 'react'
import { login } from "@/libApi/userApi"
import DataForm from "@/components/DataForm.tsx"
import "@/styles/register.css"

export default function Login()
{
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")

    const router = useRouter()

    const userLogin = async (e: FormData) =>
    {
        const u: string = e.get("username") as string
        const p: string = e.get("password") as string

        if (u === "" || p === "")
        {
            console.log("null value found")
            return
        }

        const res = await login(u, p)
        if (res.status !== 200)
        {
            console.log("User was not logged in")
        }
        else
        {
            console.log("User was logged in")
            router.push("/vs")
        }
    }

    return (
        <>
        <div className="registerWindow">
            Login
            <hr/>
            <Form action={userLogin}>
            <DataForm name='username' val={username} setVal={setUsername}/>
            <DataForm name='password' val={password} setVal={setPassword}/>
            <div className='submitButton'>
                <button className='submitButton' type='submit'>Login</button>
            </div>
            </Form>
        </div>
        </>
    )
}