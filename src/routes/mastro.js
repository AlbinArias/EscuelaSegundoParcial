const express = require('express');
const app = express.Router();

const mysqlconnectin = require('../configurations/db-conf');


app.get('/maestros', (req, res) => {
    console.log('get lista de maestros');
    mysqlconnectin.query('select docente.id, docente.fecha_ingreso, id_persona, persona.nombre, persona.apellido, persona.fecha_nacimiento,persona.Direccion from docente inner join persona on id_persona=persona.id', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Lista de maestro por id
app.get('/maestros/:id',(req, res)=>{
    console.log('get maestro');
    mysqlconnectin.query('select docente.id, docente.fecha_ingreso,id_persona,persona.nombre, persona.apellido, persona.fecha_nacimiento,persona.Direccion  from docente inner join persona on id_persona=persona.id where docente.id=?',
    [req.params.id],(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
            res.send('error');
        }
    })

});

//crear maestro 
app.post('/maestros',(req, res)=>{
    console.log('crear maestros');
    let est= req.body;
    mysqlconnectin.query('insert into docente(id_persona, fecha_ingreso) values (?,?)',[est.id_persona, est.fecha_ingreso],(err, result)=>{
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

//actualizar maestro
app.put('/maestros/:id',(req, res)=>{
    console.log('actualizar maestro');
    let est= req.body;
    console.log(est);
    mysqlconnectin.query('update docente set id_persona=?, fecha_ingreso=? where id=?',[est.id_persona, est.fecha_ingreso, req.params.id],(err, result)=>{
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
     
//eliminar maestro
app.delete('/maestros/:id',(req, res)=>{
    console.log('delete maestro');
    mysqlconnectin.query('delete from docente where id=?',[req.params.id],(err, result)=>{
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