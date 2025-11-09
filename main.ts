import { Bishop } from "./src/bishop.js"
import { King } from "./src/king.js"
import { Knight } from "./src/knight.js"
import { Pawn } from "./src/pawn.js"
import { Queen } from "./src/queen.js"
import { Rook } from "./src/rook.js"
import { Color } from "./src/color.js"

let newPiece: Pawn = new Pawn(7, 1, Color.black)
console.log(newPiece.move(5, 1))
console.log(newPiece.move(3, 1))

const king = new King(7, 1, Color.black)
console.log(king.move(6, 1))
console.log(king.move(3, 1))
