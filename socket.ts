import { ClientToServerEvents, ServerToClientEvents } from "@/lib/types/socket.ts"
import { io } from "socket.io-client"
import type { Socket } from "socket.io-client"
import config from "./lib/config/config";


const URL = process.env.NODE_ENV === 'production' ? undefined : `http://${config.URL}:3056`;

export const socket: Socket = io(URL, { autoConnect: false }) // TODO: set to false, https://socket.io/how-to/use-with-react