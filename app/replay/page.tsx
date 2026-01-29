"use client"
import { useState } from "react"

import GameBoardMock from "@/components/GameBoardMock"
import GameInfoBlock from "@/components/GameInfoBlock"
import { gameStep } from "@/lib/types/gameSteps"

const pageNumberMin: number = 1
const pageNumberMax: number = 5

export default function Page()
{
    const steps: gameStep[] = [ [ 1, 1, 1, 2, 0 ], [ 1, 2, 1, 3, 0 ], [ 1, 3, 1, 4, 0 ] ]
    const [ pageNumber, setPageNumber ] = useState(1)

    async function onClickPagePrev()
    {
        if (pageNumber === pageNumberMin) return
        const newPageNumber = pageNumber - 1
        setPageNumber(newPageNumber)
    }

    async function onClickPageNext()
    {
        if (pageNumber === pageNumberMax) return
        const newPageNumber = pageNumber + 1
        setPageNumber(newPageNumber)
    }

    return (
    <>
        <GameBoardMock steps={steps}/>
        <GameInfoBlock/>
        {/* <div>
            <button onClick={onClickPagePrev}>Previous Games</button>
            {pageNumber}
            <button onClick={onClickPageNext}>Next Games</button>
        </div> */}
    </>
    )
}