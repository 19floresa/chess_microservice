class Chessboard 
{
    readonly maxLength: number = 8
    readonly maxWidth: number = 8

    getBoardDimensions(): [ number, number]
    {
        return [ this.maxWidth, this.maxLength ]
    }

}