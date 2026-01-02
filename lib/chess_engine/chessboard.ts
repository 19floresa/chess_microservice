export class Chessboard 
{
    #gameBoard: string[][]
    constructor()
    {
        const gameBoard: string[][] = []
        for (let i = 0; i < 8; i++)
        {
            gameBoard.push(new Array(8).fill(""))
        }

        gameBoard[0] = [ "rook_dark",  "knight_dark",  "bishop_dark",  "queen_dark",  "king_dark",  "bishop_dark",  "knight_dark",  "rook_dark" ]
        gameBoard[1] = [ "pawn_dark",  "pawn_dark",    "pawn_dark",    "pawn_dark",   "pawn_dark",  "pawn_dark",    "pawn_dark",    "pawn_dark" ]
        gameBoard[6] = [ "pawn_light", "pawn_light",   "pawn_light",   "pawn_light",  "pawn_light", "pawn_light",   "pawn_light",   "pawn_light" ]
        gameBoard[7] = [ "rook_light", "knight_light", "bishop_light", "queen_light", "king_light", "bishop_light", "knight_light", "rook_light" ]

        this.#gameBoard = gameBoard
    }

    move({ x, y, x2, y2 }: { x: number, y: number, x2: number, y2: number}): boolean
    {
        if (!this.isWithinValidRange(x, y)) return false
        if (!this.isWithinValidRange(x2, y2)) return false
        const piece: string = this.getPieceName(x, y)
        this.#setPiece(piece, x2, y2)
        this.#setPiece("", x, y)
        return true
    }
    
    isWithinValidRange(newX: number, newY: number): boolean 
    {
        const [ maxWidth, maxLength ] = [ 8,8 ]
        const [ minWidth, minLength ] = [ 0, 0 ]
        const xValid = ((newX >= minWidth) && (newX < maxWidth))
        const yValid = ((newY >= minLength) && (newY < maxLength))
        return (xValid && yValid)
    }

    isPawnPromote(x: number, y: number): boolean
    {
        const piece: string = this.getPieceName(x, y)
        const [ name, color ] = piece.split("_")
        if (name !== "pawn")
        {
            return ((color === "dark" && y ===  7) || (color === "light" && y === 0))
        }
        return false
    }

    getPieceName(xPos: number, yPos: number): string
    {
        if (!this.isWithinValidRange(xPos, yPos)) return ""
        const piece: string = this.#getPiece(xPos, yPos)
        return piece
    }

    getPieceColor(xPos: number, yPos: number): string
    {
        if (!this.isWithinValidRange(xPos, yPos)) return ""
        const piece: string = this.getPieceName(xPos, yPos)
        const [ _, color ] = piece.split("_")
        return color
    }

    #getPiece(xPos: number, yPos: number): string
    {
        return this.#gameBoard[yPos][xPos]
    }

    #setPiece(piece: string, x: number, y: number): void
    {
        this.#gameBoard[y][x] = piece
    }

    setBoard(newBoard: string[][]): void
    {
        for (let i = 0 ; i < 8; i++)
        {
            for (let j = 0; j < 8; j++)
            {
                const piece: string = newBoard[j][i]
                this.#setPiece(piece, i, j)
            }
        }
    }

    // #promote(x: number, y: number)
    // {
    //     const piece: Chesspiece = this.#getPiece(x, y)
    //     const color: string = piece.getColor()
    //     let val: string = ""
    //     let n: number = -1
    //     while(true)
    //     {
    //         val = prompt("Promote Pawn: Queen (1), Rook (2), Bishop (3), Knight (4):")
    //         n = Number(val)
    //         if ((n > 0) && (n < 5)) break
    //     }

    //     let newPiece: Chesspiece = null
    //     switch(n)
    //     {
    //         case 1:
    //             newPiece = new Queen(x, y, color)
    //             break
    //         case 2:
    //             newPiece = new Rook(x, y, color)
    //             break
    //         case 3:
    //             newPiece = new Bishop(x, y, color)
    //             break
    //         case 4:
    //             newPiece = new Knight(x, y, color)
    //             break
    //         default:
    //             throw Error(`Pawn pronotion is not valid. ${n}`)
    //     }

    //     const player: Player = this.#getPlayer(color)
    //     player.removePiece(piece)
    //     player.addPiece(newPiece)
    //     this.#gameBoard[y][x] = newPiece
    // }
}