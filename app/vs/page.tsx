"use client"
import App from "@/components/App.tsx"
import { socket } from "@/socket"
import { useEffect, useState } from "react"

export default function Page()
{
    const [ isConnected, setIsConnected] = useState(socket.connected)
    const [ isTurn, setIsTurn ] = useState(false)
    useEffect(() => 
    {
        function onConnect()
        {
            console.log("Player connected.")
            setIsConnected(true)
        }

        function onDisconnect()
        {
            console.log("Player disconnected.")
            setIsConnected(false)
        }

        function onMove()
        {
            const x = 1
            const y = 7
            console.log(`Player moving to (${x}, ${y})`)
        }

        socket.on("connect", onConnect)
        socket.on("disconnect", onDisconnect)
        socket.on("move", onMove)

        return (
        () =>
        {
            socket.off("connect", onConnect)
            socket.off("disconnect", onDisconnect)
            socket.off("disconnect", onMove)
        })
         
    }, [])


    if (isConnected)
    {
        socket.emit("move", { x: 3, y: 2 }, (err, response) => console.log("nothing"))
        socket.emit("move", { x: 5, y: 6 }, (err, response) => console.log("nothing"))
    }

    return (
    <>
        <div>
            Hello
        </div>
    </>
    )
}