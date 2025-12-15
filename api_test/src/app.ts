import express from "express"
import cookieParser from "cookie-parser"
import { errorHandler } from "./middleware/errorHandler.ts"

import userRoutes from "./routes/userRoutes.ts"

const app = express()

app.use(express.json())
app.use(cookieParser)

// Routes
app.use("/user", userRoutes)

// Error Handling
app.use(errorHandler)

export default app