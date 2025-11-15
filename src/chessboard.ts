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

    #setPiece(piece: Chesspiece, newX: number, newY: number): void
    {
        const [ oldX, oldY ] = piece.getCurrentPosition()
        piece.setNewPosition(newX, newY)
        this.#gameBoard[oldY][oldX] = null
        this.#gameBoard[newY][newX] = piece
    }

    #checkNewSquare(playerColor: string, newX: number, newY: number)
    {
        const piece: Chesspiece = this.#getPiece(newX, newY)
        // TODO: Check that king wont be put in check
        return ((piece === null) || (piece.getColor() !== playerColor))
    }

    #checkSquaresJumped(piece: Chesspiece, newX: number, newY: number): boolean
    {
        return piece.checkJumpedSquares(this.#gameBoard, newX, newY)
    }

    move({ oldX, oldY, 
           newX, newY }: { oldX: number, oldY: number, 
                           newX: number, newY: number }): boolean
    {
        if (!this.isWithinValidRange(newX, newY)) return false
        if (!this.isWithinValidRange(oldX, oldY)) return false

        const piece: Chesspiece = this.#getPiece(oldX, oldY)
        const playerColor: string = this.getCurrentPlayer()
       
        if (piece === null)                                 return false // ignore empty squares
        if (playerColor !== piece.getColor())               return false // Cant move pieces from other player
        if (!piece.move(newX, newY))                        return false // ignore invalid moves
        if (!this.#checkNewSquare(playerColor, newX, newY)) return false // Dont move to square of our pieces
        if (!this.#checkSquaresJumped(piece, newX, newY))   return false // Check all squares jumped over are empty

        this.#setPiece(piece, newX, newY)
        this.changePlayer() 
       
       return true
    }
}