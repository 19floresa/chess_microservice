export default class Chessboard 
{
    #gameBoard: string[][]
    constructor()
    {
        this.clearBoard()
    }

    refresh()
    {
        this.clearBoard()
        this.init()
    }

    clearBoard()
    {
        const gameBoard: string[][] = []
        for (let i = 0; i < 8; i++)
        {
            gameBoard.push(new Array(8).fill(""))
        }
        this.#gameBoard = gameBoard
    }

    init()
    {
        const gameBoard = this.#gameBoard
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

    askPlayerToPromotePawn(x: number, y: number): number
    {
        let val: string = ""
        let n: number = -1
        while(true)
        {
            val = prompt("Promote Pawn: Queen (1), Rook (2), Bishop (3), Knight (4):")
            n = Number(val)
            if ((n > 0) && (n < 5)) break
        }

        return n
    }

    promote(x: number, y: number, value: number): void
    {
        const color: string = this.getPieceColor(x, y)
        let newPiece: string = ""
        switch(value)
        {
            case 1:
                newPiece = `queen_${color}`
                break
            case 2:
                newPiece = `rook_${color}`
                break
            case 3:
                newPiece = `bishop_${color}`
                break
            case 4:
                newPiece = `knight_${color}`
                break
            default:
                throw Error(`Pawn promotion is not valid: ${value}`)
        }
        this.#setPiece(newPiece, x, y)
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
}