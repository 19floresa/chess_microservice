import { Color } from "./color.js"

export abstract class Chesspiece {
    #xPos: number
    #yPos: number
    #color: Color

    constructor(newX: number, newY: number, color: Color)
    {
        this.setNewPosition(newX, newY)
        this.setColor(color)
    }

    setColor(color: Color)
    {
        this.#color = color
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
    
    getColor(): Color
    {
        return this.#color
    }

    move(newX: number, newY: number): boolean 
    {
        const isNewMoveValid: boolean = this.isPositionValid(newX, newY)
        if (isNewMoveValid === true)
        {
            this.setNewPosition(newX, newY)
        }
        return isNewMoveValid
    }

    abstract isPositionValid(newX: number, newY: number): boolean
}