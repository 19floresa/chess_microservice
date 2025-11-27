import express from "express"
import { errorHandler } from "./middleware/errorHandler.ts"

import userRoutes from "./routes/userRoutes.ts"

const app = express()

app.use(express.json())

// Routes
app.use("/user", userRoutes)

// Error Handling
app.use(errorHandler)

export default app