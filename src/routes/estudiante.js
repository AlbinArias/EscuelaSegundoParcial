const express = require('express');
const app = express.Router();
const mysqlconnectin = require('../configurations/db-conf');
const security= require('../security/verifier')


//lista de los estudiantes con sus nombre
app.get('/', (req, res) => {
    console.log('get estudiantes nombres');
    mysqlconnectin.query('select nombre, apellido, carnet from estudiante inner join persona on id_persona=persona.id', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});


app.get('/estudiantes',security, (req, res) => {
    console.log('get lista estudiantes');
    mysqlconnectin.query('select estudiante.id, fecha_ingreso,carnet, statuss, nombre, apellido, fecha_nacimiento, Direccion from estudiante inner join persona on id_persona=persona.id', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//mostrar estudiante
app.get('/estudiantes/:id',security,(req, res)=>{
    console.log('get estudiante');
    mysqlconnectin.query('select estudiante.id, fecha_ingreso,carnet, statuss, id_persona, nombre, apellido, fecha_nacimiento, Direccion from estudiante inner join persona on id_persona=persona.id where estudiante.id=?',[req.params.id],(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
            res.send('error');
        }
    })

});

//crear estudiante
app.post('/estudiantes',security,(req, res)=>{
    console.log('crear estudiante');
    let est= req.body;
    mysqlconnectin.query('insert into estudiante (id_persona, fecha_ingreso, carnet, statuss) values (?,?,?,?)',[est.id_persona, est.fecha_ingreso, est.carnet, est.statuss],(err, result)=>{
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

//actualizar estudiante
app.put('/estudiantes/:id',security,(req, res)=>{
    console.log('actualizar estudiante');
    let est= req.body;
    console.log(est);
    mysqlconnectin.query('update estudiante set id_persona=?, fecha_ingreso=?, carnet=?, statuss=? where id=?',[est.id_persona, est.fecha_ingreso, est.carnet, est.statuss, req.params.id],(err, result)=>{
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
     
//eliminar estudiante
app.delete('/estudiantes/:id',security,(req, res)=>{
    console.log('delete estudiante');
    mysqlconnectin.query('delete from estudiante where id=?',[req.params.id],(err, result)=>{
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