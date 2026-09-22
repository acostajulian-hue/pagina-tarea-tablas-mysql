import express from "express";

import {Rproductos} from "../rutas/rutaproducto.js"
import {Rclientes} from "../rutas/rutacliente.js"
import {Rventas} from "./rutaventa.js"

const Rinicio = express.Router();

Rinicio.get('/', (req, res)=>{
    res.render('index')
})

Rinicio.use(Rproductos)
Rinicio.use(Rclientes)
Rinicio.use(Rventas)

export{Rinicio} 
