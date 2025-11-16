import { Bishop } from "./src/bishop.js"
import { King } from "./src/king.js"
import { Knight } from "./src/knight.js"
import { Pawn } from "./src/pawn.js"
import { Queen } from "./src/queen.js"
import { Rook } from "./src/rook.js"
import { Chessboard } from "./src/chessboard.js"

const board = new Chessboard()

// const piece = board.findPiece(0, 0, "light")
// console.log(piece.move(0, 7))

// const pawn: Pawn = new Pawn(7, 1, "LIGHT")
// console.log("Pawn-----")
// console.log(pawn.move(5, 1))
// console.log(pawn.move(3, 1))
// console.log(pawn.getName())

// const king = new King(7, 1, Color.black)
// console.log("King-----")
// console.log(king.move(6, 1))
// console.log(king.move(3, 1))

// const rook: Rook = new Rook(7, 1, Color.black)
// console.log("Rook-----")
// console.log(rook.move(5, 1))
// console.log(rook.move(5, 0))
// console.log(rook.move(7, 7))

// const bishop: Bishop = new Bishop(0, 0, Color.black)
// console.log("bishop-----")
// console.log(bishop.move(7, 7))
// console.log(bishop.move(4, 4))
// console.log(bishop.move(2, 6))
// console.log(bishop.move(5, 3))
// console.log(bishop.move(6, 0))

// const knight: Knight = new Knight(3, 3, Color.black)
// console.log("knight-----")
// console.log(knight.move(5, 4))
// console.log(knight.move(3, 3))
// console.log(knight.move(4, 5))
// console.log(knight.move(3, 3))
// console.log(knight.move(3, 2))

// const queen: Queen = new Queen(0, 0, Color.black)
// console.log("queen-----")
// console.log(queen.move(7, 0))
// console.log(queen.move(7, 3))
// console.log(queen.move(0, 3))
// console.log(queen.move(2, 5))
// console.log(queen.move(7, 4))