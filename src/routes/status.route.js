//la configuracion del enrutador de status

import express from "express"
import ENVIROMENT from "../config/enviroment.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { middleware_de_prueba } from "../middlewares/luck.middleware.js"

const statusRoute = express.Router()


statusRoute.get("/ping", (req, res) => {
    res.json({
        ok: true,
        status: 200,
        message: "Pong"
    })

})


statusRoute.get("/protected/ping", middleware_de_prueba, authMiddleware, (req, res) => {
    try {
        console.log(req.headers.user)
        res.sendStatus(200)
    }
    catch (error) {
    }
})

statusRoute.get("/datos-bancarios", (req, res) => {
    try {

    }
    catch (error) {
        console.error(error)
    }
})

export default statusRoute