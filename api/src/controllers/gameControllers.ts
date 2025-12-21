import type { Request, Response } from "express"
import { type gameState, gameNew, gameSearchFind, gameSearchAdd, gameActiveFind, gameActiveAdd } from "../models/gameState.ts"

export function gameSearch(req: Request, res: Response): void
{
    try
    {
      const { id }: { id: string } = req.body
      const gameInfo: gameState = gameNew(id)
      console.log(gameInfo)

      res.send({ message: "Searching for player." })
    }
    catch (e)
    {
      res.status(400).json({ message: (e as Error).message })
    }
}

export function gameMove(req: Request, res: Response): void
{
    try
    {
        res.send({ message: "Player moved." })
    }
    catch (e)
    {
      res.status(400).json({ message: (e as Error).message })
    }
}