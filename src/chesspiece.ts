import { Color } from "./color.js"
import { Chessboard } from "./chessboard.js"

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

    isWithinValidRange(newX: number, newY: number): boolean 
    {
        const [ maxWidth, maxLength ] = [ 8, 8 ] // TODO: Fix
        const [ minWidth, minLength ] = [ 0, 0 ]
        const xValid = ((newX >= minWidth) && (newX < maxWidth))
        const yValid = ((newY >= minLength) && (newY < maxLength))
        return (xValid && yValid)
    }

    move(newX: number, newY: number): boolean 
    {
        const isValidRange: boolean = this.isWithinValidRange(newX, newY)
        const isNewMoveValid: boolean = this.isPositionValid(newX, newY)
        const isMoveValid: boolean =  isValidRange && isNewMoveValid
        if (isMoveValid)
        {
            this.setNewPosition(newX, newY)
        }
        return isMoveValid
    }

    abstract isPositionValid(newX: number, newY: number): boolean
}