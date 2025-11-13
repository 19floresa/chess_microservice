import { Chesspiece } from "./chesspiece.js"
import { playerProp, Player } from "./player.js"

export class Chessboard 
{
    readonly maxLength: number = 8
    readonly maxWidth: number = 8

    #player1: Player = null // black player (dark)
    #player2: Player = null // white player (light)

    #gameState: string
    #gameBoard: string[][]

    constructor()
    {
        this.#player1 = new Player("dark")
        this.#player2 = new Player("light")
        this.#gameState = "light"

        this.#gameBoard = new Array(this.maxLength)
        for (let i = 0; i < this.maxLength; i++)
        {
            this.#gameBoard[i] = new Array(this.maxWidth).fill("")
        }

        for (const piece of this.#player1.getAllPieces())
        {
            const [ x, y ] = piece.getCurrentPosition()
            this.#gameBoard[x][y] = piece.getName()
        }

        for (const piece of this.#player2.getAllPieces())
        {
            const [ x, y ] = piece.getCurrentPosition()
            this.#gameBoard[x][y] = piece.getName()
        }
    }
    
    isWithinValidRange(newX: number, newY: number): boolean 
    {
        const [ maxWidth, maxLength ] = this.getBoardDimensions()
        const [ minWidth, minLength ] = [ 0, 0 ]
        const xValid = ((newX >= minWidth) && (newX < maxWidth))
        const yValid = ((newY >= minLength) && (newY < maxLength))
        return (xValid && yValid)
    }

    getBoardDimensions(): [ number, number]
    {
        return [ this.maxWidth, this.maxLength ]
    }

    getPieceName(xPos: number, yPos: number): string
    {
        if (!this.isWithinValidRange(xPos, yPos)) return ""
        return this.#gameBoard[xPos][yPos]
    }

    changePlayer()
    {
        this.#gameState = (this.#gameState === "dark") ?  "light" : "dark"
    }

    getCurrentPlayer(): string
    {
        return this.#gameState
    }

    move(xPos: number, yPos: number, playerColor: string): boolean
    {
        if (!this.isWithinValidRange(xPos, yPos)) return false

       // const player: Player = (playerColor === "dark") ? this.#player1 : this.#player2


        this.changePlayer()        
        return true
    }
}