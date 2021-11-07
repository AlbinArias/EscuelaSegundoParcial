const express = require('express');
const app = express.Router();
const mysqlconnectin = require('../configurations/db-conf');
const security= require('../security/verifier')

app.get('/cursos',security, (req, res) => {
    console.log('get lista cursos');
    mysqlconnectin.query('Select * from curso', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

app.get('/cursos/:id',security, (req, res)=>{
    console.log('get curso');
    mysqlconnectin.query('select * from curso where id=?',[req.params.id],(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
            res.send('error');
        }
    })
});


app.post('/cursos',security, (req, res)=>{
    console.log('crear curso');
    let est= req.body;
    mysqlconnectin.query('insert into curso(id, nombres, descripcion) values (?,?,?)',[est.id, est.nombres, est.descripcion],(err, result)=>{
        if(!err){
            console.log(result);
            res.status(201).send('Creado Correctamente');
        }
        else{
            console.log(err);
            res.send('error' + err);
        }
    });
});

app.put('/cursos/:id',security, (req, res)=>{
    console.log('actualizar curso');
    let est= req.body;
    console.log(est);
    mysqlconnectin.query('update curso set nombres=?, descripcion=? where id=?',[est.nombres, est.descripcion, req.params.id],(err, result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Actualizado Correctamente');
        }
        else{
            console.log(err);
            res.send('error' + err);
        }
    });
});


app.delete('/cursos/:id',security, (req, res)=>{
    console.log('delete curso');
    mysqlconnectin.query('delete from curso where id=?',[req.params.id],(err, result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Eliminado Correctamente');
        }
        else{
            console.log(err);
            res.send('error');
        }
    })
});

module.exports = app;