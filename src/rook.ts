import { Chesspiece } from "./chesspiece.js"

export class Rook extends Chesspiece
{
    isPositionValid(newX: number, newY: number): boolean
    {
        return true
    }

    print(): void
    {
        const [ x, y ] = this.getCurrentPosition()
        console.log(`${x}, ${y}`)
    }
    move(newX: number, newY: number): boolean
    {
        return true
    }
}
