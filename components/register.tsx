"use client"
import Form from 'next/form'
import { useState, type SetStateAction, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import "@/styles/register.css"
import register from "@/libApi/userApi"

function DataForm({ name, val, setVal }: { name: string, val: string
                                                         setVal: (value: SetStateAction<string>) => void } )
{
    return(
        <div className='inputBox'>
            <label>
                {name}: <input name={name} value={val} onChange={(val: React.ChangeEvent<HTMLInputElement>) => setVal(val.target.value)}></input>
            </label>
        </div>
    )
}

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

        const res = await register(u, p)
        if (res.status !== 200)
        {
            console.log("User was not registered")
        }
        else
        {
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
                <button className='submitButton' type='submit'>Submit</button>
            </div>
            </Form>
        </div>
        </>
    )
}