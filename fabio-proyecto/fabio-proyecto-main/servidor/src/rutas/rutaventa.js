import express from "express";

const Rventas = express.Router();

Rventas.get('/ventas', (pet,resp)=>{
    resp.render('ventas')
})
export{Rventas}