export abstract class Chesspiece {
    #xPos: number = 0
    #yPos: number = 0
    constructor(newX: number, newY: number)
    {
        this.setNewPosition(newX, newY)
    }

    setNewPosition(newX: number, newY: number)
    {
        this.#xPos = newX
        this.#yPos = newY
    }

    getCurrentPosition(): [ number, number ]
    {
        return [ this.#xPos, this.#yPos ]
    }
    abstract isPositionValid(xPos: number, yPos: number): boolean
    abstract move(newX: number, newY: number): boolean
}