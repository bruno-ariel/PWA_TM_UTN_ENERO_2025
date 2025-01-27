import express from "express"
import ENVIROMENT from "./config/enviroment.js"
import mongoose from "./config/mongoDB.config.js"
import connectToMongoDB from "./config/mongoDB.config.js"
import User from "./models/User.model.js"
import { sendMail } from "./utils/mail.util.js"
import cors from "cors"


const app = express()
const PORT = ENVIROMENT.PORT

//Cross-Origin Resource Sharing (CORS)
app.use(
    cors({
        origin: 'http://localhost:5173'
    })
)

app.use(express.json())

//status router
// /api/status
//GET /ping => devolver status 200

//auth routes (autentificacion)
//Router: /api/auth
//POST /registro => registrarnos
//post /login => loguearnos

//menssages router
//Route: /api/messages

//GET /messges = devolver lista de mensajes

import statusRoute from "./routes/status.route.js"
import authRoute from "./routes/auth.route.js"
import workspaceRouter from "./routes/workspace.route.js"
import channelRouter from "./routes/channel.route.js"


//delegamos el flujo de consultas a /api/status al enrutador de status

app.use("/api/status", statusRoute)

app.use("/api/auth", authRoute)

app.use("/api/workspace", workspaceRouter ) 

app.use("/api/channel", channelRouter)

app.listen(PORT , () => {
    console.log(`>> el servidor se esta ejecutando en http://localhost:${PORT}`)
})

//Operaciones de autentificacion

/* sendMail({
    to: "brunoariel.dev@gmail.com",
    subject: "prueba",
    html: "<h1>hola</h1>"
}) */