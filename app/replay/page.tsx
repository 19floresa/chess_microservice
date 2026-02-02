"use client"

import { useState, useEffect } from "react"
import GameBoardReplays from "@/components/GameBoardReplays"
import Replays from "@/components/Replays.tsx"
import replayProp from '@/lib/types/replayProp'
import { gameStep } from "@/lib/types/gameSteps"
import retrieveReplay from "@/lib/api/replayApi"
import { getCookie } from "cookies-next"
import { Suspense } from "react"

export default function Page()
{
    const [ replays, setReplays ] = useState([])
    const [ prev, setPrev ] = useState([])
    const [ next, setNext ] = useState([])

    function onClickSteps(gameSteps: gameStep[])
    {
        setPrev([])
        setNext(gameSteps)
    }

    async function getReplays(gameId: number)
    {
        const playerId: number = parseInt(await getCookie("id", { domain: "http://localhost:3000" }))
        const body = await retrieveReplay(playerId, gameId)
        console.log(body.games)
        setReplays(body.games)
    }

    useEffect(() =>
    {
        getReplays(0)
    }, [])

    return (
    <>
        <GameBoardReplays prev={prev} next={next} setPrev={setPrev} setNext={setNext}/>
        <Suspense fallback={<div>loading data...</div>}>
            <Replays replays={replays} onClickSteps={onClickSteps}/>
        </Suspense>
    </>
    )
}