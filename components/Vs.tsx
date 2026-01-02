"use client"
//import { useState } from 'react'
import Image from 'next/image'
import '@/styles/Vs.css'
import { Chessboard } from "@/engine/chessboard.ts"
import GameStatus from "@/components/gameStatus.tsx"
//import type { Socket } from "socket.io-client"

import { useRouter } from 'next/navigation';
import { socket } from "@/socket"
import { useEffect, useState } from "react"
import searchGame from "@/libApi/searchGameApi"
import { getCookie } from "cookies-next"


interface positionProp 
{
  x: number
  y: number
}

function chooseSquareColor( {x, y}: positionProp): string
{
  const xPos = x % 2
  const yPos = y % 2
  if ((xPos === 0 && yPos === 0) || // even rows pattern
      (xPos === 1 && yPos === 1))   // odd rows pattern
  {
    return "light"
  }
  
  return "dark"
}

function chooseImg(name: string)
{
  if (name === "") return null
  return `/${name}.svg`
}

function Square({ x, y, handleBoard, handleClick }: { x: number, y: number, 
                                                      handleBoard: ({ x, y }: positionProp) => string, 
                                                      handleClick: ({ x, y }: positionProp) => void} )
{
  const color: string = chooseSquareColor({ x, y })
  const name: string = handleBoard({x, y})
  const img = chooseImg(name)
  return ( 
      <button className={`square ${color}`} onClick={() => handleClick({ x, y })} >
        { (img !== null) ? <Image src={img}  alt={img} width="100" height="100" className='image'/> : null }
      </button>)
}

function ChessRow({ y, handleBoard, handleClick }: { y: number, 
                                                     handleBoard: ({ x, y }: positionProp) => string, 
                                                     handleClick: ({ x, y }: positionProp) => void} )
{
  const col = [ 0, 1, 2, 3, 4, 5, 6 , 7 ]
  const chessCol = col.map((idx, key) => <Square key={key} x={idx} y={y} handleBoard={handleBoard} handleClick={handleClick}/>)
  return (
    <>
      <div className='row'>
        {chessCol}
      </div>
    </>
  )
}

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
        }

        socket.on("connect", onConnect)
        socket.on("disconnect", onDisconnect)
        socket.on("startGame", onStartGame)
        socket.on("validMoveOpponent", onValidMoveOpponent)

        return (
        () =>
        {
            socket.off("connect", onConnect)
            socket.off("disconnect", onDisconnect)
            socket.off("startGame", onStartGame)
            socket.off("validMoveOpponent", onValidMoveOpponent)
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
                            setChessboard(chessboard)
                        }
                    }
                    
                    setFirstPick([ -1, -1 ])
                })
        }
    }

    const rows = [ 0, 1, 2, 3, 4, 5, 6 , 7 ]
    const chessRows = rows.map((idx, key) => <ChessRow key={key} y={idx} handleBoard={handleBoard} handleClick={handleClick}/>)
    return (
        <>
        <div>
            {chessRows}
        </div>
        <div className="infoBox">
            <GameStatus/>
        </div>
        </>
    )
}

export default Vs
