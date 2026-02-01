import { gameStep } from '@/lib/types/gameSteps'

export default interface replayProp {
    opponentName: string
    isLight: boolean
    isWinner: boolean
    status: string
    steps: gameStep[]
}