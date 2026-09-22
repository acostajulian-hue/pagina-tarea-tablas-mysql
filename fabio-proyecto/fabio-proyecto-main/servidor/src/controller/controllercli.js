
import { conectar } from "../database/conexion.js";
const bdd= await conectar();


export const cmenu = (peq, resp)=>{
    resp.render('clientes');

};

export const calta =(peq,resp)=>{
    resp.render('clialta');

};
export const cbaja=(peq,resp)=>{
    resp.render('clibaja');

};

export const cmod=(peq,resp)=>{
    resp.render('climod');

};
export const ccons=(peq,resp)=>{
    resp.render('clicons');

};
export const cmt= async (peq,resp)=>{
    try{
        let mostrarsql="SELECT idclientes,nombre from clientes order by idclientes";
        const[registros]= await bdd.query(mostrarsql)
        console.log(registros)
        resp.render('climostrar',{registros});
    }
    catch(error){
        console.log(error);
    }

};


