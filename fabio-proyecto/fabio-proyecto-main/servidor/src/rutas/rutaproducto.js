import express from "express";
const Rproductos = express.Router();

Rproductos.get('/productos', (pet,resp)=>{
    resp.render('productos')
})
export{Rproductos}
