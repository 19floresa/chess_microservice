import '@/styles/GameInfoBlocks.css'

import generateTimeUTC from "@/lib/time/time"

export default function GameInfoBlock()
{
    const idOpponent = 1234
    const isLight = true
    const isWinner = true
    const start = generateTimeUTC()
    console.log(start)
    const end = 0
    const status = "Draw"// "Win "", "Loss", "Draw"
    const steps = [ [ 1, 1, 1, 2, 0 ], [ 1, 2, 1, 3, 0 ], [ 1, 3, 1, 4, 0 ] ]
    return (
        <>
            <div className='infoBlockContainer'>
                <div className='infoBlock'>
                    hello
                </div>
            </div>
        </>
    )
}