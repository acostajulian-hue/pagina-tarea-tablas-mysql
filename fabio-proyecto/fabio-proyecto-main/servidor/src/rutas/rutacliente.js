import { calta,cbaja,ccons,cmenu,cmod,cmt } from "../controller/controllercli.js";
import express from "express";

const Rclientes = express.Router();

Rclientes.get('/clientes',cmenu);
Rclientes.get('/cliente/clialta',calta)
Rclientes.get('/cliente/clibaja',cbaja)
Rclientes.get('/cliente/climod',cmod)
Rclientes.get('/cliente/clicons',ccons)
Rclientes.get('/cliente/climostrar',cmt)

export{Rclientes}