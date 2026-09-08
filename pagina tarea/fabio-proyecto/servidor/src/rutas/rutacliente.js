import express from "express";
const Rclientes = express.Router();

Rclientes.get('/clientes', (pet,resp)=>{
    resp.render('clientes')
})
export{Rclientes}