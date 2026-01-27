import { socket } from "@/socket"

function onClickConnect()
{
    socket.connect()
}

function onClickDisconnect()
{
    socket.disconnect()
}

export function ConnectionManager()
{
    return (
    <>
        <div>
            <button onClick={onClickConnect}>Find Game</button>
            <button onClick={onClickDisconnect}>End Game</button>
        </div>
    </>)
}