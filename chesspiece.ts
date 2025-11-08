abstract class Chesspiece {
    abstract x: number
    abstract y: number
    abstract setNewPosition(newX: number, newY: number): boolean
    abstract isPositionValid(newX: number, newY: number): boolean
}

class Brook implements Chesspiece
{
    x: number = 0
    y: number = 0
    setNewPosition(newX: number, newY: number): boolean
    {
        return true
    }
    isPositionValid(newX: number, newY: number): boolean
    {
        return true
    }
}


let newPiece: Brook = new Brook()
console.log(newPiece)