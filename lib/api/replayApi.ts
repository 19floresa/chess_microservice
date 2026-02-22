export default async function retrieveReplay(playerId: number, gameId: number)
{
    const res = await fetch('http://app:3056/game/replay', 
    { 
        method: 'POST', 
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerId, gameId })
    })

    return res.json()
}