import { Chesspiece } from "./chesspiece.js"
import { Rook } from "./rook.js"
import { Bishop } from "./bishop.js"

export class Queen extends Chesspiece
{
    checkRook(newX: number, newY: number): boolean
    {
        const [ x, y ] = this.getCurrentPosition()
        const color = this.getColor()
        const rook: Rook = new Rook(x, y, color)
        return rook.isPositionValid(newX, newY)
    }

    checkBishop(newX: number, newY: number): boolean
    {
        const [ x, y ] = this.getCurrentPosition()
        const color = this.getColor()
        const bishop: Bishop = new Bishop(x, y, color)
        return bishop.isPositionValid(newX, newY)
    }

    isPositionValid(newX: number, newY: number): boolean {
        const isValidMoveRook: boolean = this.checkRook(newX, newY)
        const isValidMoveBishop: boolean = this.checkBishop(newX, newY)
        return (isValidMoveRook || isValidMoveBishop)
    }
}