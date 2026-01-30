import '@/styles/GameInfoBlocks.css'
import Image from 'next/image'
import generateTimeUTC from "@/lib/time/time"

function Block()
{
    return (
        <>
        </>
    )
}

export default function GameInfoBlock()
{
    const opponentName = "19floresa"
    const isLight = true
    const isWinner = true
    const start = generateTimeUTC()
    console.log(start)
    const end = 0
    const status = "Draw"// "Win "", "Loss", "Draw"
    const steps = [ [ 1, 1, 1, 2, 0 ], [ 1, 2, 1, 3, 0 ], [ 1, 3, 1, 4, 0 ] ]
    console.log(start)
    const kingName = `/king_${isLight ? "light" : "dark"}.svg`
    return (
        <>
            <div className='infoBlockContainer'>
                <div className='infoBlock'>
                    <div className='headerBlock'>
                        <div className='imageBlock'>
                            <Image src={kingName}  alt={kingName} width="50" height="50" className='pieceBlock'/>
                        </div> 
                        <div className='statusBlock'>
                            {status}
                        </div>
                    </div>
                    <div className='nameBlock'>
                        {opponentName}
                    </div>
                </div>
                
                <div className='infoBlock'>
                    <div className='headerBlock'>
                        <div className='imageBlock'>
                            <Image src={kingName}  alt={kingName} width="50" height="50" className='pieceBlock'/>
                        </div> 
                        <div className='statusBlock'>
                            {status}
                        </div>
                    </div>
                    <div className='nameBlock'>
                        {opponentName}
                    </div>
                </div>
                
                <div className='infoBlock'>
                    <div className='headerBlock'>
                        <div className='imageBlock'>
                            <Image src={kingName}  alt={kingName} width="50" height="50" className='pieceBlock'/>
                        </div> 
                        <div className='statusBlock'>
                            {status}
                        </div>
                    </div>
                    <div className='nameBlock'>
                        {opponentName}
                    </div>
                </div>
                
                <div className='infoBlock'>
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
                
                <div className='infoBlock'>
                    <div className='headerBlock'>
                        <div className='imageBlock'>
                            <Image src={kingName}  alt={kingName} width="50" height="50" className='pieceBlock'/>
                        </div> 
                        <div className='statusBlock'>
                            {status}
                        </div>
                    </div>
                    <div className='nameBlock'>
                        {opponentName}
                    </div>
                </div>
            </div>
        </>
    )
}