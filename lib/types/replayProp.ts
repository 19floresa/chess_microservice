import { gameStep } from '@/lib/types/gameSteps'

export default interface replayProp {
    opponentName: string
    isLight: boolean
    isWinner: boolean
    start: string
    end: string
    status: string
    steps: gameStep[]
}