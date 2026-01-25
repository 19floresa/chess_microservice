import { socket } from "@/socket"

function connect()
{
    socket.connect()
}

function disconnect()
{
    socket.disconnect()
}

export function ConnectionManager()
{
    return (
    <>
        <div>
            <button onClick={connect}>Find Game</button>
            <button onClick={disconnect}>End Game</button>
        </div>
    </>)
}