"use client"
import Image from 'next/image'
import '@/styles/gameBoard.css'
import { positionProp } from '@/lib/types/props.ts'

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
  const chessCol = col.map((idx, key) => <Square key={key} 
                                                 x={idx} 
                                                 y={y} 
                                                 handleBoard={handleBoard} 
                                                 handleClick={handleClick}/>)
  return (
    <>
    <div className='row'>
        {chessCol}
    </div>
    </>
  )
}

export default function GameBoard({ handleBoard, handleClick }: { handleBoard: ({ x, y }: positionProp) => string, 
                                                              handleClick: ({ x, y }: positionProp) => void,} ) 
{
    const rows = [ 0, 1, 2, 3, 4, 5, 6 , 7 ]
    const chessRows = rows.map((idx, key) => <ChessRow key={key} 
                                                       y={idx} 
                                                       handleBoard={handleBoard} 
                                                       handleClick={handleClick}/>)
    return (
        <>
        <div>
            {chessRows}
        </div>
        </>
    )
}
