"use client"
import { useState } from 'react'
import Image from 'next/image'
import '@/styles/App.css'
import { Chessboard } from "@/engine/chessboard.ts"
import GameStatus from "@/components/gameStatus.tsx"
import type { Socket } from "socket.io-client"


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

function Vs({ socket }: { socket: Socket }) 
{
  const [ chessboard, setChessboard ] = useState(new Chessboard())
  const [ firstPick, setFirstPick ] = useState([ -1, -1 ])

  function handleBoard({ x, y }: positionProp): string
  {
    return chessboard.getPieceName(x, y)
  }

  function handleClick({x, y}: positionProp): void
  {
    const player:     string = chessboard.getCurrentState()
    const pieceColor: string = chessboard.getPieceColor(x, y)
    
    const [ xPos, yPos ] = firstPick
    if ((xPos === -1) && (yPos === -1)) // pick first piece
    {
      if ((pieceColor !== "") && (pieceColor === player))
      {
        const newFirstPick = [ x, y ]
        setFirstPick(newFirstPick)
      }
    }
    else
    {
        socket.timeout(5000).emit("move", { oldX: xPos, oldY: yPos, newX: x, newY: y }, (err, resp) => 
            {
                if (err)
                {
                    console.log("Could not move")
                }
                else
                {
                    if (resp.status === "ok")
                    {
                        // choose where to move piece
                        chessboard.move({ oldX: xPos, oldY: yPos, newX: x, newY: y })
                        console.log(`Player moving: (${xPos}, ${yPos}) to (${x}, ${y}).`)
                        setChessboard(chessboard)
                    }
                }
                
                const newFirstPick = [ -1, -1 ]
                setFirstPick(newFirstPick)
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
