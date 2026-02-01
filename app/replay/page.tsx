"use client"

import { useState } from "react"
import GameBoardReplays from "@/components/GameBoardReplays"
import Replays from "@/components/Replays.tsx"
import replayProp from '@/lib/types/replayProp'
import { gameStep } from "@/lib/types/gameSteps"

export default function Page()
{
    const [ prev, setPrev ] = useState([])
    const [ next, setNext ] = useState([])

    function onClickSteps(gameSteps: gameStep[])
    {
        setPrev([])
        setNext(gameSteps)
    }
    
    const replays: replayProp[] = [
        {
            opponentName: "19floresa",
            isLight: true,
            isWinner: true,
            status: "Draw",
            steps: [ [ 1, 1, 1, 2, 0 ], [ 1, 2, 1, 3, 0 ], [ 1, 3, 1, 4, 0 ] ]
        },
        {
            opponentName: "opponent1",
            isLight: false,
            isWinner: false,
            status: "Win ",
            steps: [ [ 1, 1, 1, 2, 0 ], [ 1, 2, 1, 3, 0 ], [ 1, 3, 1, 4, 0 ] ]
        },
        {
            opponentName: "opponent2",
            isLight: false,
            isWinner: false,
            status: "Win ",
            steps: [ [ 1, 1, 1, 2, 0 ], [ 1, 2, 1, 3, 0 ], [ 1, 3, 1, 4, 0 ] ]
        },
        {
            opponentName: "opponent3",
            isLight: false,
            isWinner: false,
            status: "Win ",
            steps: [ [ 1, 1, 1, 2, 0 ], [ 1, 2, 1, 3, 0 ], [ 1, 3, 1, 4, 0 ] ]
        },
        {
            opponentName: "opponent4",
            isLight: false,
            isWinner: false,
            status: "Win ",
            steps: [ [ 1, 1, 1, 2, 0 ], [ 1, 2, 1, 3, 0 ], [ 1, 3, 1, 4, 0 ] ]
        },
        {
            opponentName: "opponent5",
            isLight: false,
            isWinner: false,
            status: "Win ",
            steps: [ [ 4, 1, 4, 2, 0 ], [ 4, 2, 4, 3, 0 ], [ 4, 3, 4, 4, 0 ] ]
        }
    ]

    return (
    <>
        <GameBoardReplays prev={prev} next={next} setPrev={setPrev} setNext={setNext}/>
        <Replays replays={replays} onClickSteps={onClickSteps}/>
    </>
    )
}