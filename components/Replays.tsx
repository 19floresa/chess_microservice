import '@/styles/Replays.css'
import Image from 'next/image'
import { gameStep } from '@/lib/types/gameSteps'
import replayProp from '@/lib/types/replayProp'
import { useState } from "react"

const pageNumberMin: number = 1

function Block({ replay, onClickSteps }: { replay: replayProp, onClickSteps: (a: gameStep[]) => void } )
{
    const { opponentName, isLight, isWinner, status, steps} = replay
    const kingName = `/king_${isLight ? "light" : "dark"}.svg`
    const classColor = isWinner ? "infoBlockWin" : "infoBlockLose"
    return (        
        <div className={classColor} onClick={() => onClickSteps(steps)}>
            <div className='headerBlock'>
                <div className='imageBlock'>
                    <Image src={kingName}  alt={kingName} width="45" height="45" className='pieceBlock'/>
                </div> 
                <div className='statusBlock'>
                    {status}
                </div>
            </div>
            <div className='nameBlock'>
                {opponentName}
            </div>
        </div>
    )
}

export default function Replays({ replays, onClickSteps }: { replays: replayProp[], onClickSteps: ( a: gameStep[]) => void })
{
    const [ pageNumber, setPageNumber ] = useState(1)
    const [ pageNumberMax, setPageNumberMax ] = useState(1)

    // Total number of games
    const len = replays.length
    const max = (pageNumberMax) * 5
    if ((max) < (len))
    {
        setPageNumberMax(Math.ceil(len/5))
    }

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

    // Get replay Blocks to post
    const replayBlocks = [ ]
    for (let i = 0; i < 5; i++)
    {
        const idx = ((pageNumber - 1) * 5) + i
        if (idx >= len) break
        replayBlocks.push(<Block key={i} replay={replays[idx]} onClickSteps={onClickSteps}/>)
    }

    return (
        <>   
            <div className='infoBlockContainer'> 
                <div>
                    {replayBlocks}
                </div>
                <div>
                    <button onClick={onClickPagePrev}>Previous Games</button>
                        {pageNumber}
                    <button onClick={onClickPageNext}>Next Games</button>
                </div>
            </div>
        </>
    )
}