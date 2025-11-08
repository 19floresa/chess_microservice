import { Chesspiece } from "./chesspiece.js"
import { Color } from "./color.js"

export class Pawn extends Chesspiece
{
    #firstMove: boolean = true

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

    isPositionValid(newX: number, newY: number): boolean 
    {
        const [ xDif, yDif ] = this.calculateNewPosition(newX, newY)
        console.log(`${xDif}, ${yDif}`)
        if (this.#firstMove)
        {
            return (xDif >= 1) && (xDif <= 2) && (yDif === 0)
        }
        else
        {
            return (xDif === 1) && (yDif === 0)
        }
    }

    /**
     * This function overwritess the move function. Pawns can move 2 squares if its 
     * the first move.
     * @param newX New X location
     * @param newY New Y location
     * @returns true - if pawn can move to the new locatio. Otherwise false
     */
    move(newX: number, newY: number): boolean 
    {
        const isMovementSuccessfull: boolean = super.move(newX, newY)
        this.#firstMove = false
        return isMovementSuccessfull
    }
}