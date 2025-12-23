import { Chessboard } from "./chessboard.ts"

const dark: string = "dark"
const light: string = "light"

export abstract class Chesspiece {
    #xPos: number
    #yPos: number
    #color: string
    #name: string

    constructor(newX: number, newY: number, color: string)
    {
        this.setNewPosition(newX, newY)
        this.setColor(color)
        this.#setName()
    }

    #setName(): void
    {
        this.#name = `${this.constructor.name.toLowerCase()}_${this.#color}`
    }

    getName(): string
    {
        return this.#name
    }

    setColor(color: string): void
    {
        const c = color.toLowerCase()
        if (c === dark || c === light)
        {
            this.#color = c
        }
        else
        {
            throw Error("Invalid color.")
        }
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
    
    getColor(): string
    {
        return this.#color
    }
}