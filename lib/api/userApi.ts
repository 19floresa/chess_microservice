import config from "../config/config"

export async function register(username: string, password: string)
{
    return await fetch(`http://${config.URL}:3025/user/register`, 
    { 
      method: 'POST', 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
}

export async function login(username: string, password: string)
{
  return await fetch(`http://${config.URL}:3025/user/login`, 
  { 
    method: 'POST', 
    credentials: 'include',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
}