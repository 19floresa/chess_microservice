"use client"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { socket } from "@/socket"
import { getCookie } from "cookies-next"

import Chessboard from "@/engine/chessboard.ts"
import GameStatus from "@/components/gameStatus.tsx"
import GameBoard from "@/components/GameBoard.tsx"
import searchGame from "@/libApi/searchGameApi"

import '@/styles/Vs.css'
import { positionProp } from '@/lib/types/props.ts'

function Vs() 
{
    const [ chessboard, setChessboard ] = useState(new Chessboard())
    const [ firstPick, setFirstPick ] = useState([ -1, -1 ])

    const [ isConnected, setIsConnected] = useState(socket.connected)
    const [ startGame, setStartGame ] = useState(false)
    const [ color, setColor ] = useState("")

    const router = useRouter()
    useEffect(() => 
    {
        async function onConnect()
        {
            console.log("Player connected.")
            chessboard.clearBoard()
            setChessboard(chessboard)
            
            const userId: number = parseInt(await getCookie("id", { domain: "http://localhost:3000" }))
            const body = await searchGame(userId)
            const gameId: number = body.gameId ?? -1
            console.log(gameId)
            socket.timeout(5000).emit("connectPlayer", { userId, gameId }, (err, resp) => 
            {
                if (err)
                {
                    console.log("Failed to connect to the game.")
                }
                else
                {             
                    console.log(resp)                          
                    if (resp.status === "ok")
                    {
                        const { color } = resp
                        setColor(color)
                        setIsConnected(true)
                    }
                }
            })
        }
        
        function onValidMoveOpponent({ x, y, x2, y2 })
        {
            console.log(`Opponent moving: (${x}, ${y}) to (${x2}, ${y2}).`)
            chessboard.move({ x, y, x2, y2 })
            setChessboard(chessboard)
            router.refresh()
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
            chessboard.init()
            setChessboard(chessboard)
        }

        function onEndGame({ isWinnerLight })
        {
            const winner: string = isWinnerLight ? "light" : 'dark'
            console.log(`Player Won: ${winner}`)
            setIsConnected(false)
            setStartGame(false)
            setColor("")
            socket.disconnect()
        }

        socket.on("connect", onConnect)
        socket.on("disconnect", onDisconnect)
        socket.on("startGame", onStartGame)
        socket.on("validMoveOpponent", onValidMoveOpponent)
        socket.on("endGame", onEndGame)

        return (
        () =>
        {
            socket.off("connect", onConnect)
            socket.off("disconnect", onDisconnect)
            socket.off("startGame", onStartGame)
            socket.off("validMoveOpponent", onValidMoveOpponent)
            socket.off("endGame", onEndGame)
        })
    }, [])

    function handleBoard({ x, y }: positionProp): string
    {
        return chessboard.getPieceName(x, y)
    }

    function handleClick({ x, y }: positionProp): void
    {
        if (!isConnected || !startGame || !color)
        {
            console.log(`Connected: ${isConnected}, Start Game: ${startGame}, Player: ${color}`)
            setFirstPick([ -1, -1 ])
            return
        }

        //const currentPlayer:     string = chessboard.getCurrentState()
        const pieceColor: string = chessboard.getPieceColor(x, y)
        
        const [ xPos, yPos ] = firstPick
        if ((xPos === -1) && (yPos === -1)) // pick first piece
        {
            if (/*(currentPlayer && player) && */(pieceColor !== "") && (pieceColor === color))
            {
                const newFirstPick = [ x, y ]
                setFirstPick(newFirstPick)
            }
        }
        else
        {
            socket.timeout(5000).emit("move", { x: xPos, y: yPos, x2: x, y2: y }, (err, resp) => 
                {
                    if (err)
                    {
                        console.log("Try again. Server did not acknowledge move.")
                    }
                    else
                    {
                        if (resp.status === "ok")
                        {
                            // choose where to move piece
                            console.log(`Player moving: (${xPos}, ${yPos}) to (${x}, ${y}).`)
                            chessboard.move({ x: xPos, y: yPos, x2: x, y2: y })

                            const isPromoting = resp.isPromoting
                            if (isPromoting)
                            {
                                const promote = chessboard.askPlayerToPromotePawn(x, y)
                                chessboard.promote(x, y, promote)
                            }

                            // TODO: handle promotion
                            // TODO: Handle win condition
                            setChessboard(chessboard)
                        }
                    }
                    
                    setFirstPick([ -1, -1 ])
                })
        }
    }

    return (
        <>
        <div>
            <GameBoard handleBoard={handleBoard} handleClick={handleClick}/>
        </div>
        <div className="infoBox">
            <GameStatus/>
        </div>
        </>
    )
}

export default Vs
