"use client"
import  Vs from "@/components/Vs.tsx"
import { socket } from "@/socket"
import { useEffect, useState } from "react"
import searchGame from "@/libApi/searchGameApi"
import { getCookie } from "cookies-next"

export default function Page()
{
    const [ isConnected, setIsConnected] = useState(socket.connected)
    const [ startGame, setStartGame ] = useState(false)
    const [ color, setColor ] = useState("")
    useEffect(() => 
    {
        async function onConnect()
        {
            console.log("Player connected.")
            const userId: number = parseInt(await getCookie("id", { domain: "http://localhost:3000" }))
            const { gameId } = await searchGame(userId)
            socket.timeout(5000).emit("connectPlayer", { userId, gameId }, (err, resp) => 
            {
                if (err)
                {
                    console.log("Failed to connect to the game.")
                }
                else
                {                                       
                    if (resp.status === "ok")
                    {
                        const { color } = resp
                        setColor(color)
                        setIsConnected(true)
                    }
                }
            })
        }

        function onDisconnect()
        {
            console.log("Player disconnected.")
            setIsConnected(false)
        }

        function onStartGame()
        {
            console.log("Start game")
            setStartGame(true)
        }

        socket.on("connect", onConnect)
        socket.on("disconnect", onDisconnect)
        socket.on("startGame", onStartGame)

        return (
        () =>
        {
            socket.off("connect", onConnect)
            socket.off("disconnect", onDisconnect)
            socket.off("startGame", onStartGame)
        })
    }, [])

    return (
    <>
        <Vs socket={socket} isConnected={isConnected} startGame={startGame} player={color}/>
    </>
    )
}