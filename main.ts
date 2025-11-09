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

const bishop: Bishop = new Bishop(3, 3, Color.black)
console.log("bishop-----")
console.log(bishop.move(5, 4))
console.log(bishop.move(3, 3))
console.log(bishop.move(4, 5))
console.log(bishop.move(3, 3))
console.log(bishop.move(3, 2))

const knight: Knight = new Knight(0, 0, Color.black)
console.log("bishop-----")
console.log(knight.move(7, 7))
console.log(knight.move(4, 4))
console.log(knight.move(2, 6))
console.log(knight.move(5, 3))
console.log(knight.move(6, 0))
