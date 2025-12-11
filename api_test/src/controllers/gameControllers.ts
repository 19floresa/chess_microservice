import type { Request, Response } from "express"
import { type gameState, gameSearching, gameActive } from "../models/gameState.ts"


export function gameSearch(req: Request, res: Response): void
{
    try
    {
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