import { Chesspiece } from "./chesspiece.js"
import { playerProp, Player } from "./player.js"

export class Chessboard 
{
    readonly maxLength: number = 8
    readonly maxWidth: number = 8

    #player1: Player = null // black player (dark)
    #player2: Player = null // white player (light)

    #gameState: string
    #gameBoard: Chesspiece[][]

    constructor()
    {
        this.#player1 = new Player("dark")
        this.#player2 = new Player("light")
        this.#gameState = "light"

        this.#gameBoard = new Array(this.maxLength)
        for (let i = 0; i < this.maxLength; i++)
        {
            this.#gameBoard[i] = new Array(this.maxWidth).fill(null)
        }

        for (const piece of this.#player1.getAllPieces())
        {
            const [ x, y ] = piece.getCurrentPosition()
            this.#gameBoard[y][x] = piece
        }

        for (const piece of this.#player2.getAllPieces())
        {
            const [ x, y ] = piece.getCurrentPosition()
            this.#gameBoard[y][x] = piece
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
        const piece: Chesspiece = this.#gameBoard[yPos][xPos]
        if (piece === null) return ""
        return piece.getName()
    }

    getPieceColor(xPos: number, yPos: number): string
    {
        if (!this.isWithinValidRange(xPos, yPos)) return ""
        const piece: Chesspiece = this.#gameBoard[yPos][xPos]
        if (piece === null) return ""
        return piece.getColor()
    }

    changePlayer()
    {
        this.#gameState = (this.#gameState === "dark") ?  "light" : "dark"
    }

    getCurrentPlayer(): string
    {
        return this.#gameState
    }

    #getPiece(xPos: number, yPos: number): Chesspiece
    {
        return this.#gameBoard[yPos][xPos]
    }

    #setPiece(piece: Chesspiece, oldX: number, oldY: number, newX: number, newY: number): void
    {
        this.#gameBoard[oldY][oldX] = null
        this.#gameBoard[newY][newX] = piece
    }

    move({ oldX, oldY, 
           newX, newY }: { oldX: number, oldY: number, 
                           newX: number, newY: number }): boolean
    {
        if (!this.isWithinValidRange(newX, newY)) return false

       //const player: Player = (this.getCurrentPlayer() === "dark") ? this.#player1 : this.#player2

       const piece: Chesspiece = this.#getPiece(oldX, oldY)
       const didPieceMove: boolean = piece.move(newX, newY)
       if (didPieceMove === true)
       {
            this.changePlayer() 
       }

       this.#setPiece(piece, oldX, oldY, newX, newY)
       
       return true
    }
}