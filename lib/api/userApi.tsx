export default async function register(username: string, password: string)
{
    return await fetch('http://localhost:3000/api/register', 
    { 
      method: 'POST', 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
}