import { Chesspiece } from "./chesspiece.js"

export class Pawn extends Chesspiece
{
    isPositionValid(newX: number, newY: number): boolean {
        const [ x, y ] = this.getCurrentPosition()
        const xDif: number = newX - x
        const yDif: number = newY - y
        return (xDif === 1) && (yDif === 0)
    }
}