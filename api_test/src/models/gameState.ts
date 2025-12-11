export interface gameState {
    idUserLight: number;
    idUserDark: number;
    idGame: number;
    gameHistory: [];
}

export const gameSearching: Array<gameState> = []
export const gameActive: Record<number, gameState> = {}




