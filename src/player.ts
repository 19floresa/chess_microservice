import { Bishop } from "./bishop.js"
import { Chesspiece } from "./chesspiece.js"
import { King } from "./king.js"
import { Knight } from "./knight.js"
import { Pawn } from "./pawn.js"
import { Queen } from "./queen.js"
import { Rook } from "./rook.js"

export interface playerProp {
    king: King, 
    queen: Queen[], 
    bishop: Bishop[], 
    pawn: Pawn[], 
    knight: Knight[],
    rook: Rook[]
}

export class Player 
{
    #playerPieces: playerProp = null

    constructor(color: string)
    {
        this.#setupPlayer(color)
    }

    #setupPlayer(color: string): void
    {
        const row1 = (color === "dark" ) ? 7 : 0;
        const row2 = (color === "dark" ) ? 6 : 1;
        const data: playerProp = {
            king: new King(row1, 4, color),
            queen: [ new Queen(row1, 3, color) ],
            bishop: [ new Bishop(row1, 2, color), new Bishop(row1, 5, color) ],
            pawn: [],
            knight: [ new Knight(row1, 1, color), new Knight(row1, 6, color) ],
            rook: [ new Rook(row1, 0, color), new Rook(row1, 7, color) ]
        }

        for (let i = 0; i < 8; i++)
        {
            data.pawn.push(new Pawn(row2, i, color))
        }

        this.#playerPieces = data
    }

    getAllPieces(): Chesspiece[]
    {
        const { king, queen, bishop, pawn, knight, rook } = this.#playerPieces
        return [ king, ...queen, ...bishop, ...knight, ...rook, ...pawn]
    }

    findPiece(xPos: number, yPos: number): Chesspiece
    {
        const pieces: Chesspiece[]  = this.getAllPieces()
        for (const piece of pieces)
        {
            const [ pieceX, pieceY ] = piece.getCurrentPosition()
            if ((xPos === pieceX) && (yPos === pieceY))
            {
                return piece
            }
        }

        return null
    }

    removePiece(piece: Chesspiece): boolean
    {
        const find = (elem: Chesspiece) => 
        {
            const [ x, y ] = elem.getCurrentPosition()
            return (xPos === x) && (yPos === y)
        }

        const [ targetName, targetColor ] = piece.getName().split("_")
        const [ xPos, yPos ] = piece.getCurrentPosition()
        switch(targetName)
        {
            case "queen":
            case "bishop":
            case "pawn":
            case "knight":
            case "rook":
                const pieces: Chesspiece[] = this.#playerPieces[targetName]
                const idx: number = pieces.findIndex(find)
                if (idx !== -1)
                {
                    this.#playerPieces[targetName].splice(idx, 1)
                    return true
                }
                break
            default:
                //throw Error(`Cannot remove this piece: ${name}`)
                break
        }

        return false
    }
}