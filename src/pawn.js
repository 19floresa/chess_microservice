var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Pawn_firstMove;
import { Chesspiece } from "./chesspiece.js";
export class Pawn extends Chesspiece {
    constructor() {
        super(...arguments);
        _Pawn_firstMove.set(this, true);
    }
    isPositionValid(newX, newY) {
        const [xDif, yDif] = this.calcPosDiffByColor(newX, newY);
        if (__classPrivateFieldGet(this, _Pawn_firstMove, "f")) {
            return (xDif >= 1) && (xDif <= 2) && (yDif === 0);
        }
        else {
            return (xDif === 1) && (yDif === 0);
        }
    }
    /**
     * This function overwritess the move function. Pawns can move 2 squares if its
     * the first move.
     * @param newX New X location
     * @param newY New Y location
     * @returns true - if pawn can move to the new locatio. Otherwise false
     */
    move(newX, newY) {
        const isMovementSuccessfull = super.move(newX, newY);
        __classPrivateFieldSet(this, _Pawn_firstMove, false, "f");
        return isMovementSuccessfull;
    }
}
_Pawn_firstMove = new WeakMap();
