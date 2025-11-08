import { Chesspiece } from "./chesspiece.js"

export class Queen extends Chesspiece
{
    isPositionValid(xPos: number, yPos: number): boolean {
        throw new Error("Method not implemented.");
    }
}