import { Chesspiece } from "./chesspiece.js";
export class King extends Chesspiece {
    isPositionValid(newX, newY) {
        const [xDif, yDif] = this.calcPosDiffByGreater(newX, newY);
        return (xDif <= 1) && (yDif <= 1);
    }
}
