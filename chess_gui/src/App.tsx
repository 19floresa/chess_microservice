import { useState } from 'react'
import king from './assets/king_dark.svg'
// import viteLogo from '/vite.svg'
import './App.css'

interface positionProp 
{
  x: number
  y: number
}

function Square({ x, y }: positionProp)
{
  const xPos = x % 2
  const yPos = y % 2
  let color: string = ""
  if (xPos === 0 && yPos === 0) // even rows
  {
    color = "light"
  }
  else if (xPos === 1 && yPos === 1) // odd rows
  {
    color = "light"
  }
  else
  {
    color = "dark"
  }

  const onSquareClick = () => console.log(`(${x},${y})`)
  return ( 
      <button className={`square ${color}`} onClick={onSquareClick} >
        <img src={king}  alt="King Chess Piece." className='image'/></button>
  )
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

function App() {
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
//       <div className="card">
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
