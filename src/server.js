import express from "express"
import ENVIROMENT from "./config/enviroment.js"
import mongoose from "./config/mongoDB.config.js"
import connectToMongoDB from "./config/mongoDB.config.js"
import User from "./models/User.model.js"
import { sendMail } from "./utils/mail.util.js"
import cors from "cors"
import statusRoute from "./routes/status.route.js"
import authRoute from "./routes/auth.route.js"
import workspaceRouter from "./routes/workspace.route.js"
import channelRouter from "./routes/channel.route.js"

const app = express()
const PORT = ENVIROMENT.PORT

app.use(
    cors({
        origin: ENVIROMENT.URL_FRONTEND
    })
)
app.use(express.json())

app.use("/api/status", statusRoute)

app.use("/api/auth", authRoute)

app.use("/api/workspace", workspaceRouter ) 

app.use("/api/channel", channelRouter)

app.listen(PORT , () => {
    console.log(`>> el servidor se esta ejecutando en http://localhost:${PORT}`)
})
