import { useState } from 'react'

import king_dark from './assets/king_dark.svg'
import queen_dark from "./assets/queen_dark.svg"
import rook_dark from "./assets/rook_dark.svg"
import pawn_dark from "./assets/pawn_dark.svg"
import bishop_dark from "./assets/bishop_dark.svg"
import knight_dark from "./assets/knight_dark.svg"

import king_light from './assets/king_light.svg'
import queen_light from "./assets/queen_light.svg"
import rook_light from "./assets/rook_light.svg"
import pawn_light from "./assets/pawn_light.svg"
import bishop_light from "./assets/bishop_light.svg"
import knight_light from "./assets/knight_light.svg"


// import viteLogo from '/vite.svg'
import './App.css'

import { Chessboard } from "../../src/chessboard.ts"

interface positionProp 
{
  x: number
  y: number
}

const images =
{
  "king_dark":    king_dark,
  "queen_dark":   queen_dark,
  "rook_dark":    rook_dark,
  "pawn_dark":    pawn_dark,
  "bishop_dark":  bishop_dark,
  "knight_dark":  knight_dark,
  "king_light":   king_light,
  "queen_light":  queen_light,
  "rook_light":   rook_light,
  "pawn_light":   pawn_light,
  "bishop_light": bishop_light,
  "knight_light": knight_light,
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
  const img = images[name]
  if (img !== undefined)
  {
    return img
  }

  return null
}

function Square({ x, y, handleBoard, handleClick }: { x: number, y: number, 
                                                      handleBoard: ({ x, y }: positionProp) => string, 
                                                      handleClick: ({ x, y }: positionProp) => void} )
{
  const color: string = chooseSquareColor({ x, y })
  const name: string = handleBoard({x, y})
  const img = chooseImg(name)
  if (img !== null)
  {
    return ( 
      <button className={`square ${color}`} onClick={() => handleClick({ x, y })} >
        <img src={img}  alt={img} className='image'/>
      </button>
  )
  }
  else
  {
    return ( 
      <button className={`square ${color}`} onClick={() => handleClick({ x, y })}/>)
  }
}

function ChessRow({ y, handleBoard, handleClick }: { y: number, 
                                                     handleBoard: ({ x, y }: positionProp) => string, 
                                                     handleClick: ({ x, y }: positionProp) => void} )
{
  return (
    <>
      <div className='row'>
        <Square x={0} y ={y} handleBoard={handleBoard} handleClick={handleClick}/>
        <Square x={1} y ={y} handleBoard={handleBoard} handleClick={handleClick}/>
        <Square x={2} y ={y} handleBoard={handleBoard} handleClick={handleClick}/>
        <Square x={3} y ={y} handleBoard={handleBoard} handleClick={handleClick}/>
        <Square x={4} y ={y} handleBoard={handleBoard} handleClick={handleClick}/>
        <Square x={5} y ={y} handleBoard={handleBoard} handleClick={handleClick}/>
        <Square x={6} y ={y} handleBoard={handleBoard} handleClick={handleClick}/>
        <Square x={7} y ={y} handleBoard={handleBoard} handleClick={handleClick}/>
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
  
  return (
    <>
      <div>
        <ChessRow y={0} handleBoard={handleBoard} handleClick={handleClick}/>
        <ChessRow y={1} handleBoard={handleBoard} handleClick={handleClick}/>
        <ChessRow y={2} handleBoard={handleBoard} handleClick={handleClick}/>
        <ChessRow y={3} handleBoard={handleBoard} handleClick={handleClick}/>
        <ChessRow y={4} handleBoard={handleBoard} handleClick={handleClick}/>
        <ChessRow y={5} handleBoard={handleBoard} handleClick={handleClick}/>
        <ChessRow y={6} handleBoard={handleBoard} handleClick={handleClick}/>
        <ChessRow y={7} handleBoard={handleBoard} handleClick={handleClick}/>
      </div>
    </>
  )
}

export default App
