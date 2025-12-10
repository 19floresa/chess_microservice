'use server'

import { NextResponse, type NextRequest } from 'next/server'

async function loginUser(username: string, password: string)
{
  return await fetch('http://localhost:3025/user/login', 
    { 
      method: 'POST', 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    }) 
}
 
export async function POST(request: Request) 
{
  try 
  {
    const resClient = await request.json()
    const { username, password } = resClient
    const res = await loginUser(username, password)
    const body = await res.json()
    const status = res.status
    if (status !== 200)
    {
      throw new Error(body)
    }

    return NextResponse.json({ msg: "User was successfully logged in."}, { status: 200 })
  }
  catch(e)
  {
    const error: string = (e as Error).message || "Internal Server Error."
    return NextResponse.json({ error }, { status: 500 })
  }
}