import { Chesspiece } from "./chesspiece.js"

export class Rook extends Chesspiece
{
    isPositionValid(newX: number, newY: number): boolean
    {
        const [ xDif, yDif ] = this.calcPosDiffByGreater(newX, newY)
        const isMovingVertically   = (xDif === 0) && (yDif !== 0)
        const isMovingHorizontally = (xDif !== 0) && (yDif === 0)
        return ( isMovingVertically ||isMovingHorizontally )
    }
}
