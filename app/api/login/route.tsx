'use server'

import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers'

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

    const cookieStore = await cookies()
    const { message, id } = body
    cookieStore.set("id", id)
    return NextResponse.json({ message }, { status: 200 })
  }
  catch(e)
  {
    const error: string = (e as Error).message || "Internal Server Error."
    return NextResponse.json({ error }, { status: 500 })
  }
}