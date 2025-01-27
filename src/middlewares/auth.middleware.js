import ENVIROMENT from "../config/enviroment.js" //siempre agregarle el js manualmente
import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) => {
    try{
        const access_token = req.headers.authorization.split (" ") [1]
        //cuando hacemos el veryfy ademas de verificar la firma del token tambien transformamos el token en un objeto nuevamente
        const user_info = jwt.verify(access_token, ENVIROMENT.SECRET_KEY_JWT)
        req.user = user_info
        return next()
    }
    catch (error){
        console.error(error)
        res.json({
            of:false,
            status:401,
            message:" unauthorized"
        })
    }
}