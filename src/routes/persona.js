const express = require('express');
const router = express.Router();
const mysqlconnectin = require('../configurations/db-conf');
const security= require('../security/verifier')

//lista de todas las personas
router.get('/personas',security, (req, res) => {
    console.log('get lista personas');
    mysqlconnectin.query('Select * from persona', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});
//Lista de persona por id
router.get('/personas/:id',security,(req, res)=>{
    console.log('get persona');
    mysqlconnectin.query('select * from persona where id=?',[req.params.id],(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
            res.send('error');
        }
    })

});

//crear persona
router.post('/personas',security,(req, res)=>{
    console.log('crear persona');
    let est= req.body;
    mysqlconnectin.query('insert into persona (Nombre, Apellido, fecha_nacimiento, Direccion) values (?,?,?,?)',[est.nombre, est.apellido, est.fecha_nacimiento, est.Direccion],(err, result)=>{
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

//actualizar persona
router.put('/personas/:id',security,(req, res)=>{
    console.log('actualizar persona');
    let est= req.body;
    console.log(est);
    mysqlconnectin.query('update persona set nombre=?, apellido=?, fecha_nacimiento=?, Direccion=? where id=?',[est.nombre, est.apellido, est.fecha_nacimiento, est.Direccion, req.params.id],(err, result)=>{
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
     
//eliminar persona
router.delete('/personas/:id',security,(req, res)=>{
    console.log('delete persona');
    mysqlconnectin.query('delete from persona where id=?',[req.params.id],(err, result)=>{
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

module.exports = router;