import { Bishop } from "./bishop.ts"
import { Chesspiece } from "./chesspiece.ts"
import { Knight } from "./knight.ts"
import { playerProp, Player } from "./player.ts"
import { Queen } from "./queen.ts"
import { Rook } from "./rook.ts"

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

    getCurrentState(): string
    {
        return this.#gameState
    }

    #getPlayer(color: string)
    {
        return (color === "dark") ? this.#player1 : this.#player2
    }

    #getPiece(xPos: number, yPos: number): Chesspiece
    {
        return this.#gameBoard[yPos][xPos]
    }

    setPiece(piece: Chesspiece, newX: number, newY: number): void
    {
        const [ oldX, oldY ] = piece.getCurrentPosition()
        piece.setNewPosition(newX, newY)
        this.#gameBoard[oldY][oldX] = null
        this.#gameBoard[newY][newX] = piece
    }

    move({ oldX, oldY, newX, newY }: { oldX: number, oldY: number, newX: number, newY: number}): boolean
    {
        const piece: Chesspiece = this.#getPiece(oldX, oldY)
        if (piece !== null)
        {
            this.setPiece(piece, newX, newY)
            this.changePlayer()
            return true
        }
        return false
    }


    #promote(x: number, y: number)
    {
        const piece: Chesspiece = this.#getPiece(x, y)
        const color: string = piece.getColor()
        let val: string = ""
        let n: number = -1
        while(true)
        {
            val = prompt("Promote Pawn: Queen (1), Rook (2), Bishop (3), Knight (4):")
            n = Number(val)
            if ((n > 0) && (n < 5)) break
        }

        let newPiece: Chesspiece = null
        switch(n)
        {
            case 1:
                newPiece = new Queen(x, y, color)
                break
            case 2:
                newPiece = new Rook(x, y, color)
                break
            case 3:
                newPiece = new Bishop(x, y, color)
                break
            case 4:
                newPiece = new Knight(x, y, color)
                break
            default:
                throw Error(`Pawn pronotion is not valid. ${n}`)
        }

        const player: Player = this.#getPlayer(color)
        player.removePiece(piece)
        player.addPiece(newPiece)
        this.#gameBoard[y][x] = newPiece
    }
}