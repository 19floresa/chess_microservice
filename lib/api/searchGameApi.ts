export default async function searchGame(id: number)
{
    const res = await fetch('http://localhost:3056/game/search', 
    { 
      method: 'POST', 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    })
    return await res.json()
}