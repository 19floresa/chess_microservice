"use client"
import  Vs from "@/components/Vs.tsx"
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

        socket.on("connect", onConnect)
        socket.on("disconnect", onDisconnect)

        return (
        () =>
        {
            socket.off("connect", onConnect)
            socket.off("disconnect", onDisconnect)
        })
    }, [])


    // if (isConnected)
    // {
    //     socket.emit("move", { x: 3, y: 2 }, (err, response) => console.log("nothing"))
    // }

    return (
    <>
        <Vs socket={socket}/>
    </>
    )
}