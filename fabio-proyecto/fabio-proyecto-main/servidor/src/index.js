import express from 'express';
import colors from 'colors';
import path from 'path';
import{ fileURLToPath} from 'url';
//se define el puerto en el que se ejecutara el servidor
const puerto=3000
const app=express()
app.set('view engine','ejs')



const directorio=path.dirname(fileURLToPath(import.meta.url));

app.set('views',path.join(directorio,'vistas'))

console.log(directorio)
app.use(express.static(path.join(directorio,'public')))

import {Rinicio} from './rutas/rutainicio.js'

//se crea la ruta para la pagina principal

app.use(Rinicio)






//se muestra el puerto en el que se esta ejecutando el servidor
app.listen(puerto,()=>{
    console.log(`Servidor iniciando ${puerto}`.blue)
})