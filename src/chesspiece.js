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
var _Chesspiece_instances, _Chesspiece_xPos, _Chesspiece_yPos, _Chesspiece_color, _Chesspiece_name, _Chesspiece_setName;
const dark = "dark";
const light = "light";
export class Chesspiece {
    constructor(newX, newY, color) {
        _Chesspiece_instances.add(this);
        _Chesspiece_xPos.set(this, void 0);
        _Chesspiece_yPos.set(this, void 0);
        _Chesspiece_color.set(this, void 0);
        _Chesspiece_name.set(this, void 0);
        this.setNewPosition(newX, newY);
        this.setColor(color);
        __classPrivateFieldGet(this, _Chesspiece_instances, "m", _Chesspiece_setName).call(this);
    }
    getName() {
        return __classPrivateFieldGet(this, _Chesspiece_name, "f");
    }
    setColor(color) {
        const c = color.toLocaleLowerCase();
        if (c === dark || c === light) {
            __classPrivateFieldSet(this, _Chesspiece_color, c, "f");
        }
        else {
            throw Error("Invalid color.");
        }
    }
    setNewPosition(newX, newY) {
        __classPrivateFieldSet(this, _Chesspiece_xPos, newX, "f");
        __classPrivateFieldSet(this, _Chesspiece_yPos, newY, "f");
    }
    getCurrentPosition() {
        return [__classPrivateFieldGet(this, _Chesspiece_xPos, "f"), __classPrivateFieldGet(this, _Chesspiece_yPos, "f")];
    }
    getColor() {
        return __classPrivateFieldGet(this, _Chesspiece_color, "f");
    }
    isWithinValidRange(newX, newY) {
        const [maxWidth, maxLength] = [8, 8]; // TODO: Fix
        const [minWidth, minLength] = [0, 0];
        const xValid = ((newX >= minWidth) && (newX < maxWidth));
        const yValid = ((newY >= minLength) && (newY < maxLength));
        return (xValid && yValid);
    }
    isMoving(newX, newY) {
        const [xDif, yDif] = this.calcPosDiffByGreater(newX, newY);
        return !((xDif === 0) && (yDif === 0));
    }
    calcPosDiffByGreater(newX, newY) {
        const [x, y] = this.getCurrentPosition();
        let xDif = 0;
        let yDif = 0;
        if (newX < x) {
            xDif = x - newX;
        }
        else {
            xDif = newX - x;
        }
        if (newY < y) {
            yDif = y - newY;
        }
        else {
            yDif = newY - y;
        }
        return [xDif, yDif];
    }
    calcPosDiffByColor(newX, newY) {
        const [x, y] = this.getCurrentPosition();
        const color = this.getColor();
        let xDif = 0;
        let yDif = 0;
        if (color === dark) {
            xDif = x - newX;
            yDif = y - newY;
        }
        else {
            xDif = newX - x;
            yDif = newY - y;
        }
        return [xDif, yDif];
    }
    move(newX, newY) {
        const isValidRange = this.isWithinValidRange(newX, newY);
        const isMoving = this.isMoving(newX, newY);
        const isNewMoveValid = this.isPositionValid(newX, newY);
        const isMoveValid = isValidRange && isMoving && isNewMoveValid;
        if (isMoveValid) {
            this.setNewPosition(newX, newY);
        }
        return isMoveValid;
    }
}
_Chesspiece_xPos = new WeakMap(), _Chesspiece_yPos = new WeakMap(), _Chesspiece_color = new WeakMap(), _Chesspiece_name = new WeakMap(), _Chesspiece_instances = new WeakSet(), _Chesspiece_setName = function _Chesspiece_setName() {
    __classPrivateFieldSet(this, _Chesspiece_name, `${this.constructor.name.toLowerCase()}_${__classPrivateFieldGet(this, _Chesspiece_color, "f")}`, "f");
};
