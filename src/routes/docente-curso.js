const express = require('express');
const app = express.Router();
const mysqlconnectin = require('../configurations/db-conf');
const security= require('../security/verifier')

app.get('/docente-curso', security, (req, res) => {
    console.log('get lista docente-cursos');
    mysqlconnectin.query('select curso_docente.id, curso_docente.id_docente, persona.nombre, apellido, curso_docente.id_curso, curso.nombres, stauts, fecha_inicio, fecha_fin from curso_docente inner join docente on  curso_docente.id_docente=docente.id inner join persona on docente.id_persona=persona.id inner join curso on id_curso=curso.id', 
    (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

app.get('/docente-curso/:id',security, (req, res)=>{
    console.log('get docente-curso');
    mysqlconnectin.query('select curso_docente.id, curso_docente.id_docente, persona.nombre, apellido, curso_docente.id_curso, curso.nombres, stauts, fecha_inicio, fecha_fin from curso_docente inner join docente on  curso_docente.id_docente=docente.id inner join persona on docente.id_persona=persona.id inner join curso on id_curso=curso.id where curso_docente.id=?',[req.params.id],(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
            res.send('error');
        }
    })
});


app.post('/docente-curso',security, (req, res)=>{
    console.log('crear docente-curso');
    let est= req.body;
    mysqlconnectin.query('insert into curso_docente(id, id_docente, id_curso, stauts, fecha_inicio, fecha_fin) values (?,?,?,?,?,?)',[est.id, est.id_docente, est.id_curso, est.stauts, est.fecha_inicio, est.fecha_fin],(err, result)=>{
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

app.put('/docente-curso/:id',security, (req, res)=>{
    console.log('actualizar docente-curso');
    let est= req.body;
    console.log(est);
    mysqlconnectin.query('update curso_docente set id_docente=?, id_curso=?, stauts=?, fecha_inicio=?, fecha_fin=? where id=?',[est.id_docente, est.id_curso, est.stauts, est.fecha_inicio, est.fecha_fin, req.params.id],(err, result)=>{
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


app.delete('/docente-curso/:id',security, (req, res)=>{
    console.log('delete docente-curso');
    mysqlconnectin.query('delete from curso_docente where id=?',[req.params.id],(err, result)=>{
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