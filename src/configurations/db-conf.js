const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
 host:'j8oay8teq9xaycnm.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
 user: 'yfu04apx0ao62ket',
database: 'zs8fvsine9bhvju5',
password:"wvk0n3y179zeiflo",
multipleStatements: true
  });

  mysqlConnection.connect(function (err) {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log('Ahora estamos en Linea');
    }
  });

  module.exports = mysqlConnection;