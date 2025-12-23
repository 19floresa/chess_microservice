import { ClientToServerEvents, ServerToClientEvents } from "@/lib/types/socket.ts"
import { io } from "socket.io-client"


const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3056';

export const socket = io(URL, { autoConnect: true }) // TODO: set to false, https://socket.io/how-to/use-with-react