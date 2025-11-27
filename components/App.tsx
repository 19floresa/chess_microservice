"use client"
import { useState } from 'react'
import Image from 'next/image'


// import king_dark from './assets/king_dark.svg'
// import queen_dark from "./assets/queen_dark.svg"
// import rook_dark from "./assets/rook_dark.svg"
// import pawn_dark from "./assets/pawn_dark.svg"
// import bishop_dark from "./assets/bishop_dark.svg"
// import knight_dark from "./assets/knight_dark.svg"

// import king_light from './assets/king_light.svg'
// import queen_light from "./assets/queen_light.svg"
// import rook_light from "./assets/rook_light.svg"
// import pawn_light from "./assets/pawn_light.svg"
// import bishop_light from "./assets/bishop_light.svg"
// import knight_light from "./assets/knight_light.svg"


import '@/styles/App.css'

import { Chessboard } from "@/engine/chessboard.ts"

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

function App() 
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
      return
    }
    
    // choose where to move piece
    const didPieceMove = chessboard.move({ oldX: xPos, oldY: yPos, 
                                           newX: x, newY: y })

    const newFirstPick = [ -1, -1 ]
    setFirstPick(newFirstPick)
    setChessboard(chessboard)
  }

  const rows = [ 0, 1, 2, 3, 4, 5, 6 , 7 ]
  const chessRows = rows.map((idx, key) => <ChessRow key={key} y={idx} handleBoard={handleBoard} handleClick={handleClick}/>)
  return (
    <>
      <div>
        {chessRows}
      </div>
    </>
  )
}

export default App
