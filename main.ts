import { Bishop } from "./src/bishop.js"
import { King } from "./src/king.js"
import { Knight } from "./src/knight.js"
import { Pawn } from "./src/pawn.js"
import { Queen } from "./src/queen.js"
import { Rook } from "./src/rook.js"
import { Color } from "./src/color.js"

const pawn: Pawn = new Pawn(7, 1, Color.black)
console.log("Pawn-----")
console.log(pawn.move(5, 1))
console.log(pawn.move(3, 1))

const king = new King(7, 1, Color.black)
console.log("King-----")
console.log(king.move(6, 1))
console.log(king.move(3, 1))

const rook: Rook = new Rook(7, 1, Color.black)
console.log("Rook-----")
console.log(rook.move(5, 1))
console.log(rook.move(5, 0))
console.log(rook.move(7, 7))
