import { Chesspiece } from "./chesspiece.js"

export class Pawn extends Chesspiece
{
    #firstMove: boolean = true

    isPositionValid(newX: number, newY: number): boolean 
    {
        const [ xDif, yDif ] = this.calcPosDiffByColor(newX, newY)        
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