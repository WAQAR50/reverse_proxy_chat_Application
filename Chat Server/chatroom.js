
/*
import pkg from 'pg';
const { Client } = pkg;
const client = new Client({

    host:"localhost",
    username:"postgres",
    port:"5432",
    password:"test123",
    database:"postgres"


})
client.connect();*/
/*import pkg from 'pg';
const { Pool } = pkg;
const pool = new Pool({
    host:"localhost",
    username:"postgres",
    port:"5432",
    password:"test123",
    database:"chat"
})

pool.connect();*/
/*client.query("select * from chatgroups",(err, res)=>{
    if(!err){
        console.log(res.rows);
    }else{
        console.log(err.message);
    }
    client.end;

})*/

import pkg from 'pg';

const cn = {
    host: 'localhost', // server name or IP address;
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'test123'
};

// alternative:
// var cn = 'postgres://username:password@host:port/database';
var client = new pkg.Client(cn);
client.connect();
client.query("select * from chatgroups",(err, res)=>{
    if(!err){
        console.log(res.rows);
    }else{
        console.log(err.message);
    }
    client.end;

})