import { Bishop } from "./bishop.js"
import { Chesspiece } from "./chesspiece.js"
import { King } from "./king.js"
import { Knight } from "./knight.js"
import { Pawn } from "./pawn.js"
import { Queen } from "./queen.js"
import { Rook } from "./rook.js"

interface boardProp {
    king: King, 
    queen: Queen, 
    bishop: Array<Bishop>, 
    pawn: Array<Pawn>, 
    knight: Array<Knight>,
    rook: Array<Rook>
}

export class Chessboard 
{
    readonly maxLength: number = 8
    readonly maxWidth: number = 8

    board: { dark: boardProp, light: boardProp } = null

    constructor()
    {
        this.setupBoard()
    }

    setupBoard(): void
    {
        const setup = (c: string) =>
        {
            const x = (c === "dark" ) ? 7 : 0;
            const pawnX = (c === "dark" ) ? 6 : 1;
            const data: boardProp = {
                king: new King(x, 4, c),
                queen: new Queen(x, 3, c),
                bishop: [ new Bishop(x, 2, c), new Bishop(x, 5, c) ],
                pawn: [],
                knight: [ new Knight(x, 1, c), new Knight(x, 6, c) ],
                rook: [ new Rook(x, 0, c), new Rook(x, 7, c) ]
            }

            for (let i = 0; i < 8; i++)
            {
                data.pawn.push(new Pawn(pawnX, i, c))
            }
            return data
        }

        this.board = { dark: setup("dark"), light: setup("light") }
    }

    getAllPieces(color: string): Chesspiece[]
    {
        const { king, queen, bishop, pawn, knight, rook } = this.board[color]
        return [ king, queen, ...bishop, ...knight, ...rook, ...pawn]
    }

    findPiece(xPos: number, yPos: number, color: string): Chesspiece
    {
        const pieces: Array<Chesspiece>  = this.getAllPieces(color)
        for (const piece of pieces)
        {
            const [ pieceX, pieceY ] = piece.getCurrentPosition()
            console.log(typeof piece)
            if ((xPos === pieceX) && (yPos === pieceY))
            {
                return piece
            }
        }

        return null
    }


    getBoardDimensions(): [ number, number]
    {
        return [ this.maxWidth, this.maxLength ]
    }
}