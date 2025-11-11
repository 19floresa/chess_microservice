export class Chessboard {
    constructor() {
        this.maxLength = 8;
        this.maxWidth = 8;
    }
    getBoardDimensions() {
        return [this.maxWidth, this.maxLength];
    }
}
