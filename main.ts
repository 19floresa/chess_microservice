import { Bishop } from "./src/bishop.js"
import { King } from "./src/king.js"
import { Knight } from "./src/knight.js"
import { Pawn } from "./src/pawn.js"
import { Queen } from "./src/queen.js"
import { Rook } from "./src/rook.js"
import { Color } from "./src/color.js"

let newPiece: Pawn = new Pawn(1, 1, Color.black)
console.log(newPiece.move(0, 1))
