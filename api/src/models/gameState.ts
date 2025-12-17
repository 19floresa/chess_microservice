import { generateTimeUTC } from "../../../lib/time/time.ts"

export interface gameState {
    userIdLight: number;
    userIdDark: number;
    gameId: number;
    gameHistory: [];
    timeStarted: number;
    timeCompleted: number;
}

const gameSearching: Array<gameState> = []
const gameActive: Record<number, gameState> = {}

/**
 * This function generate a game ID between the range specified below: [ min to max ]
 * @returns New game ID
 */
function gameGenerateId(): number
{
  const min = 0x112233445566
  const max = 0xFFFFFFFFFFFF
  while (true)
  {
    const gameId = Math.floor( Math.random() * ((max - min) + min) )
    const game = gameSearchFind(gameId)
    if (game === null)
    {
        return gameId
    }
  }
}

export function gameNew(userIdLight: number)
{
  const gameId = gameGenerateId()
  const timeStarted = generateTimeUTC()
  const gameInfo: gameState =
  {
    userIdLight,
    userIdDark: -1,
    gameId,
    gameHistory: [],
    timeStarted,
    timeCompleted: -1
  }
  return gameInfo
}

export function gameSearchFind(gameId: number): gameState | null
{
    for (const game of gameSearching)
    {
        if (gameId === game.gameId)
        {
            return game
        }
    }
    return null
}

// export function gameSearchRemove(gameId: number): void
// {
//     const games: Array<gameState> = gameSearching.filter((item: gameState) => gameId !== item.gameId)
//     gameSearch = games
// }

export function gameSearchAdd(game: gameState): void
{
    gameSearching.push(game)
}

// export function gameActiveRemove(gameId: number): boolean
// {
//     const
// }

export function gameActiveFind(userId: number): gameState | null
{

    const game: gameState | undefined = gameActive[userId]
    return game === undefined ? null : game
}

export function gameActiveAdd(game: gameState, userId: number): void
{
    gameActive[userId] = game
}
