import { Chesspiece } from "./chesspiece.js";
export class Bishop extends Chesspiece {
    isPositionValid(newX, newY) {
        const [xDif, yDif] = this.calcPosDiffByGreater(newX, newY);
        return (xDif === yDif) && (xDif !== 0) && (yDif !== 0);
    }
}
