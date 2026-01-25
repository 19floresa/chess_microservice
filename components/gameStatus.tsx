import "@/styles/gameStatus.css"
import { ConnectionManager } from "@/components/ConnectionManager.tsx"


export default function GameStatus()
{
    return (
        <>
        <div className="statusBox">
            <ConnectionManager/>
        </div>
        </>
    )
}