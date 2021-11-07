const express = require('express');
const app = express.Router();
const mysqlconnectin = require('../configurations/db-conf');
const security= require('../security/verifier')

app.get('/estudiante-curso',security, (req, res) => {
    console.log('get lista estudiante-cursos');
    mysqlconnectin.query('select estudiante_curso.id, estudiante.carnet, persona.nombre, apellido,curso.nombres, status, fecha_inicio, fecha_fin from estudiante_curso inner join estudiante on id_estudiante=estudiante.id inner join persona on estudiante.id_persona=persona.id inner join curso on id_curso=curso.id', 
    (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

app.get('/estudiante-curso/:id',security, (req, res)=>{
    console.log('get estudiante-curso');
    mysqlconnectin.query('select estudiante_curso.id, estudiante.carnet, persona.nombre, apellido,curso.nombres, status, fecha_inicio, fecha_fin from estudiante_curso inner join estudiante on id_estudiante=estudiante.id inner join persona on estudiante.id_persona=persona.id inner join curso on id_curso=curso.id where estudiante_curso.id=?',[req.params.id],(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
            res.send('error');
        }
    })
});


app.post('/estudiante-curso',security, (req, res)=>{
    console.log('crear estudiante-curso');
    let est= req.body;
    mysqlconnectin.query('insert into estudiante_curso(id, id_estudiante, id_curso, status, fecha_inicio, fecha_fin) values (?,?,?,?,?,?)',[est.id, est.id_estudiante, est.id_curso, est.status, est.fecha_inicio, est.fecha_fin],(err, result)=>{
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

app.put('/estudiante-curso/:id',security, (req, res)=>{
    console.log('actualizar estudiante-curso');
    let est= req.body;
    console.log(est);
    mysqlconnectin.query('update estudiante_curso set id_estudiante=?, id_curso=?, status=?, fecha_inicio=?, fecha_fin=? where id=?',[est.id_estudiante, est.id_curso, est.status, est.fecha_inicio, est.fecha_fin, req.params.id],(err, result)=>{
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


app.delete('/estudiante-curso/:id',security, (req, res)=>{
    console.log('delete estudiante-curso');
    mysqlconnectin.query('delete from estudiante_curso where id=?',[req.params.id],(err, result)=>{
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