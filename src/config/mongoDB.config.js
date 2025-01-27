import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/TM_PWA_LUN_MIER_DIC")
.then(()=>{
    console.log("Conectado a la base de datos mongo DB correctamente !")
})
.catch((error)=>{
    console.error("Mongo DB conenection error ", error)
})

export default mongoose

/* 
async / await
.then : onResolved / .catch : onReject
*/