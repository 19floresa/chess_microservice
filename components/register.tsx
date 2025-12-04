"use client"
import Form from 'next/form'
import { useState } from 'react'
import "@/styles/register.css"


function DataForm({ name, val, setVal }: { name: string, val: string
                                                         setVal: (v: React.ChangeEvent<HTMLInputElement>) => void } )
{
    return(
        <div className='inputBox'>
            <label>
                {name}: <input name={name} value={val} onChange={setVal}></input>
            </label>
        </div>
    )
}

function Register()
{
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")

    const saveUsername = (u: React.ChangeEvent<HTMLInputElement>) => setUsername(u.target.value)
    const savePassword = (p: React.ChangeEvent<HTMLInputElement>) => setPassword(p.target.value)

    const userRegister = (e: FormData) =>
    {
        const u = e.get("username")
        const p = e.get("password")

        if (u === "" || p === "")
        {
            console.log("null value found")
        }

        (async () =>
        {
            const res = await fetch('http://localhost:3000/api', 
    { 
      method: 'POST', 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "alex", password: "12312" })
    }) 
    console.log(res)
        })()

        
    }
    return (
        <>
        <div className="registerWindow">
            Register a new user
            <hr/>
            <Form action={userRegister}>
            <DataForm name='username' val={username} setVal={saveUsername}/>
            <DataForm name='password' val={password} setVal={savePassword}/>
            <div className='submitButton'>
                <button className='submitButton' type='submit'>Submit</button>
            </div>
            </Form>
        </div>
        </>
    )
}

export default Register