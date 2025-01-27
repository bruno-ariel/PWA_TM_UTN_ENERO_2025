export const middleware_de_prueba = (req, res, next) => {
    const numero_random = Math.random() // genera un numero aleatorio entre 0 y 1
    console.log("numero random >>" , numero_random)
    if (numero_random > 0.5) {
        //guardo los header de mi consulta un dato
        req.headers.suerte = ">> el usuario tiene suerte "
        return next()
    }
    else{
        return res.json ({
            ok: false,
            status: 401,
            message: "no tuvo suerte!"
        })
    }
}