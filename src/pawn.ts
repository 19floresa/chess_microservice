import { Chesspiece } from "./chesspiece.js"
import { Color } from "./color.js"

export class Pawn extends Chesspiece
{
    calculateNewPosition(newX: number, newY: number): [ number, number]
    {
        const [ x, y ] = this.getCurrentPosition()
        const color = this.getColor()
        let xDif: number = 0
        let yDif: number = 0
        if (color === Color.black)
        {
            xDif = x - newX
            yDif = y - newY
        }
        else
        {
            xDif = newX - x
            yDif = newY - y
        }
        return [ xDif, yDif ]
    }

    isPositionValid(newX: number, newY: number): boolean {
        const [ xDif, yDif ] = this.calculateNewPosition(newX, newY)
        return (xDif === 1) && (yDif === 0)
    }
}