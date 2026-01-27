"use client"
import GameBoard from "@/components/GameBoard"
import Chessboard from "@/engine/chessboard.ts"
import { useState } from "react"

import { positionProp } from "@/lib/types/props"

export default function Page()
{
    const [ board, setBoard ] = useState(new Chessboard(true))
    const [ prev, setPrev ] = useState([])
    const [ next, setNext ] = useState([[ 1, 1, 1, 2 ], [ 1, 2, 1, 3 ], [ 1, 3, 1, 4 ] ])
    const [ pageNumber, setPageNumber ] = useState(1)
    const [ pageNumberMax, setPageNumberMax ] = useState(5)
    const [ toggleButtons, setToggleButtons ] = useState([ false, true ])

    const handleClick = ({ x, y }: positionProp) => { return }
    const handleBoard = ({ x, y }: positionProp): string => board.getPieceName(x, y)

    function onClickNext()
    {
        if (next.length === 0) return
        const newNext = next.slice()
        const newPrev = prev.slice()
        const n = newNext.shift()
        newPrev.push(n)
        const [ x, y, x2, y2 ] = n
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
        const [ x2, y2, x, y ] = p
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

    async function onClickPagePrev()
    {
        const newPageNumber = pageNumber - 1
        const newToggleButtons = (newPageNumber === 1)  ? [ false, true] : [ true, true ]
        setToggleButtons(newToggleButtons)
        setPageNumber(newPageNumber)
    }

    async function onClickPageNext()
    {
        const newPageNumber = pageNumber + 1
        const newToggleButtons = (newPageNumber === pageNumberMax)  ? [ true, false ] : [ true, true ]
        setToggleButtons(newToggleButtons)
        setPageNumber(newPageNumber)
    }

    return (
    <>
        <div>
            <GameBoard handleClick={handleClick} handleBoard={handleBoard}/>
            <button onClick={onClickPrev}>Previous Move</button>
            <button onClick={onClickReset}>Reset Moves</button>
            <button onClick={onClickNext}>Next Move</button>
        </div>
        <div>
           { toggleButtons[0] ? <button onClick={onClickPagePrev}>Previous Games</button> : null }
            {pageNumber}
            { toggleButtons[1] ? <button onClick={onClickPageNext}>Next Games</button> : null }
        </div>
    </>
    )
}