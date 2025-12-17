export interface user { 
    username: string; 
    password: string; 
    id: number; 
}

export const users: Record<string, user> = {}
