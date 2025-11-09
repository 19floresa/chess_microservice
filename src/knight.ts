import { Chesspiece } from "./chesspiece.js"

export class Knight extends Chesspiece
{
    isPositionValid(newX: number, newY: number): boolean 
    {
        const [ xDif, yDif ] = this.calcPosDiffByGreater(newX, newY)
        return (xDif === yDif) && (xDif !== 0) && (yDif !== 0)
    }
}