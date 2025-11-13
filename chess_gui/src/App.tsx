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

//import { ChessBoard } from "../../src/chessboard.ts"

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

//const g = new ChessBoard()

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

function Square({ x, y }: positionProp)
{
  const color: string = chooseSquareColor({ x, y })
  const name: string = (x % 2 === 0) ? "rook_light" : "pawn_dark"
  const img: any = chooseImg(name)
  const onSquareClick = () => console.log(`(${x},${y})`)

  if (img !== null)
  {
    return ( 
      <button className={`square ${color}`} onClick={onSquareClick} >
        <img src={img}  alt={img} className='image'/>
      </button>
  )
  }
  else
  {
    return ( 
      <button className={`square ${color}`} onClick={onSquareClick}/>
  )
  }
}

function ChessRow({ y }: { y: number} )
{
  return (
    <>
      <div className='row'>
        <Square x={0} y ={y}/>
        <Square x={1} y ={y}/>
        <Square x={2} y ={y}/>
        <Square x={3} y ={y}/>
        <Square x={4} y ={y}/>
        <Square x={5} y ={y}/>
        <Square x={6} y ={y}/>
        <Square x={7} y ={y}/>
      </div>
    </>
  )
}

function App() 
{
  //const [ chessboard, setChessboard ] = useState(new ChessBoard())
  return (
    <>
      <div>
        <ChessRow y={0}/>
        <ChessRow y={1}/>
        <ChessRow y={2}/>
        <ChessRow y={3}/>
        <ChessRow y={4}/>
        <ChessRow y={5}/>
        <ChessRow y={6}/>
        <ChessRow y={7}/>
      </div>
    </>
  )
}

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <divsrc className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

export default App
