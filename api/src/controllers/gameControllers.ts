import type { Request, Response } from "express"
import { type gameState, gameSearching, gameActive } from "../models/gameState.ts"

import { generateTimeUTC } from "../../../lib/time/time.ts"

function newGame(id: number): gameState
{
  const min = 0x112233445566
  const max = 0xFFFFFFFFFFFF
  const idGame = Math.floor( Math.random() * ((max - min) + min) )
  const timeStarted = generateTimeUTC()
  const gameInfo: gameState =
  {
    idUserLight: id,
    idUserDark: -1,
    idGame,
    gameHistory: [],
    timeStarted,
    timeCompleted: -1
  }
  return gameInfo
}

export function gameSearch(req: Request, res: Response): void
{
    try
    {
      const { id }: string = req.body
      console.log(newGame(id))

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