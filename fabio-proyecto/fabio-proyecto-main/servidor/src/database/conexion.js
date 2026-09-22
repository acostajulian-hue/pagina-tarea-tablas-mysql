import mysql from 'mysql2/promise'
export async function conectar(){
    try{
        const bdd= await mysql.createPool({
            host:'localhost',
            database:'mydb',
            user:'root',
            password:'1234'
        })
        console.log('conectado')
        return bdd;
        
    }catch(error){
        console.log('error al conectar la base de datos')}
}