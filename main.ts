import { Bishop } from "./src/bishop.js"
import { King } from "./src/king.js"
import { Knight } from "./src/knight.js"
import { Pawn } from "./src/pawn.js"
import { Queen } from "./src/queen.js"
import { Rook } from "./src/rook.js"

let newPiece: Rook = new Rook(1, 35)
console.log(newPiece)
newPiece.print()