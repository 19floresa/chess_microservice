import { Chesspiece } from "./chesspiece.js"

export class King extends Chesspiece
{
    isPositionValid(xPos: number, yPos: number): boolean {
        throw new Error("Method not implemented.");
    }
    move(newX: number, newY: number): boolean {
        throw new Error("Method not implemented.");
    }
}