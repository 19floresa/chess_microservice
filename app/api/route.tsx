'use server'

import { NextResponse, type NextRequest } from 'next/server'

async function registerUser(username: string, password: string)
{
  return await fetch('http://localhost:3025/user/register', 
    { 
      method: 'POST', 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    }) 
}
 
export async function GET(request: Request) 
{
  try 
  {
    const resClient = request.json()
    console.log(resClient)
    const res = await registerUser(username, password)
    const body = await res.json()
    const status = res.status
    if (status !== 200)
    {
      throw new Error(body)
    }

    return NextResponse.json(body, { status: 200 })
  }
  catch(e)
  {
    const error: string = (e as Error).message || "Internal Server Error."
    return NextResponse.json({ error }, { status: 500 })
  }
}