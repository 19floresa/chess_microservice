"use client"
import GameBoard from "@/components/GameBoard"
import Chessboard from "@/engine/chessboard.ts"

import { useState } from "react"
import { positionProp } from "@/lib/types/props"
import { gameStep } from "@/lib/types/gameSteps"

export default function GameBoardMock({ steps }: { steps: gameStep[] })
{
    const [ board, setBoard ] = useState(new Chessboard(true))
    const [ prev, setPrev ] = useState([])
    const [ next, setNext ] = useState(steps)

    const handleClick = ({ x, y }: positionProp) => { return }
    const handleBoard = ({ x, y }: positionProp): string => board.getPieceName(x, y)

    function onClickNext()
    {
        if (next.length === 0) return
        const newNext = next.slice()
        const newPrev = prev.slice()
        const n = newNext.shift()
        newPrev.push(n)
        const [ x, y, x2, y2, promote ] = n
        board.move({ x, y, x2, y2 })
        setPrev(newPrev)
        setNext(newNext)
        setBoard(board)
    }

    function onClickPrev()
    {
        if (prev.length === 0) return
        const newPrev = prev.slice()
        const p = newPrev.pop()
        const newNext = [p, ...next]
        const [ x2, y2, x, y, promote ] = p
        board.move({ x, y, x2, y2 })
        setPrev(newPrev)
        setNext(newNext)
        setBoard(board)
    }

    function onClickReset()
    {
        const newNext = [ ...prev, ...next ]
        const newPrev = []
        board.clearBoard()
        board.init()
        setPrev(newPrev)
        setNext(newNext)
        setBoard(board)
    }

    return(
        <>
            <div>
                <GameBoard handleClick={handleClick} handleBoard={handleBoard}/>
                <button onClick={onClickPrev}>Previous Move</button>
                <button onClick={onClickReset}>Reset Moves</button>
                <button onClick={onClickNext}>Next Move</button>
            </div>
        </>
    )
}