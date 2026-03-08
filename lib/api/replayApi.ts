import config from "../config/config"

export default async function retrieveReplay(playerId: number, gameId: number)
{
    const res = await fetch(`http://${config.URL}:3056/game/replay`, 
    { 
        method: 'POST', 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerId, gameId })
    })

    return res.json()
}