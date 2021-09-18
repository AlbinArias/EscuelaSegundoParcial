const mysql = require('mysql');
const express=require('express');
const bodyParser= require('body-parser');
const dbconfig= require('./configurations/db-conf');

var app=express();
app.use(bodyParser.json());

var mysqlconnectin= mysql.createConnection({
    host: dbconfig.host,
    user: dbconfig.user,
    database: dbconfig.database,
    password: dbconfig.password
    
});

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

//lista de todas las personas
app.get('/personas', (req, res) => {
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
app.get('/personas/:id',(req, res)=>{
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
app.post('/personas',(req, res)=>{
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
app.put('/personas/:id',(req, res)=>{
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
app.delete('/personas/:id',(req, res)=>{
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
// aqui empiezan los metodos para los maestros

//lista de todos los maestros
app.get('/maestros', (req, res) => {
    console.log('get lista de maestros');
    mysqlconnectin.query('select * from docente inner join persona on id_persona=persona.id', (err, rows, fields) => {
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
    mysqlconnectin.query('select * from docente inner join persona on id_persona=persona.id where docente.id=?',[req.params.id],(err, rows, fields)=>{
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


// aqui empiezan los metodos para los estudiante
//mostrar todos los estudiante
app.get('/estudiantes', (req, res) => {
    console.log('get lista estudiantes');
    mysqlconnectin.query('select * from estudiante inner join persona on id_persona=persona.id', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//mostrar estudiante
app.get('/estudiantes/:id',(req, res)=>{
    console.log('get estudiante');
    mysqlconnectin.query('select * from estudiante inner join persona on id_persona=persona.id where estudiante.id=?',[req.params.id],(err, rows, fields)=>{
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
app.post('/estudiantes',(req, res)=>{
    console.log('crear estudiante');
    let est= req.body;
    mysqlconnectin.query('insert into estudiante (id_persona, fecha_ingreso, carnet, status) values (?,?,?,?)',[est.id_persona, est.fecha_ingreso, est.carnet, est.status],(err, result)=>{
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
app.put('/estudiantes/:id',(req, res)=>{
    console.log('actualizar estudiante');
    let est= req.body;
    console.log(est);
    mysqlconnectin.query('update estudiante set id_persona=?, fecha_ingreso=?, carnet=?, status=? where id=?',[est.id_persona, est.fecha_ingreso, est.carnet, est.status, req.params.id],(err, result)=>{
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
app.delete('/estudiantes/:id',(req, res)=>{
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





app.listen(process.env.PORT ||3000);
