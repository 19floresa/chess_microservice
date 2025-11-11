import { Chesspiece } from "./chesspiece.js";
import { Rook } from "./rook.js";
import { Bishop } from "./bishop.js";
export class Queen extends Chesspiece {
    checkRook(newX, newY) {
        const [x, y] = this.getCurrentPosition();
        const color = this.getColor();
        const rook = new Rook(x, y, color);
        return rook.isPositionValid(newX, newY);
    }
    checkBishop(newX, newY) {
        const [x, y] = this.getCurrentPosition();
        const color = this.getColor();
        const bishop = new Bishop(x, y, color);
        return bishop.isPositionValid(newX, newY);
    }
    isPositionValid(newX, newY) {
        const isValidMoveRook = this.checkRook(newX, newY);
        const isValidMoveBishop = this.checkBishop(newX, newY);
        console.log(`Rook: ${isValidMoveRook}, Bishop: ${isValidMoveBishop}`);
        return (isValidMoveRook || isValidMoveBishop);
    }
}
