import { Chesspiece } from "./chesspiece.js"

export class Pawn extends Chesspiece
{
    #firstMove: boolean = true

    isPositionValid(newX: number, newY: number): boolean 
    {
        const [ xDif, yDif ] = this.calcPosDiffByColor(newX, newY)        
        if (this.#firstMove)
        {
            return (xDif === 0) && (yDif >= 1) && (yDif <= 2)
        }
        else
        {
            return (xDif === 0) && (yDif === 1)
        }
    }

    checkJumpedSquares(gameBoard: Chesspiece[][], newX: number, newY: number): boolean
    {
        const board: Chesspiece[][] = structuredClone(gameBoard)
        const [ oldX, oldY ] = this.getCurrentPosition()
        const yDif: number = oldY - newY
        if (Math.abs(yDif) === 2)
        {
            // Moving over 2 squares
            const dif: number = (yDif === -2) ? 1 : -1
            if (board[oldY + dif][oldX] !== null) return false
        }
        this.#firstMove = false
        return true
    }
}