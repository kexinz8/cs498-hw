onst mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');

// connect to the mysql database in previous instance
var connection = mysql.createConnection({
       host : '34.136.225.88',
       user : 'master',
       password : 'cs498db',
       database : 'mydb'

});
connection.connect();

const app = express();
app.use(bodyParser.json());

// Greeting
app.get('/greeting', (req,res) => {
        res.send('Hello World!');
});

// Register
app.post('/register', (req,res) => {
       let n = req.body.username;
       n = n.replace(/^[0-9\s]*|[+*\r\n]/g, '');
       query = `INSERT INTO Users (username) VALUES ('`+n+`');`;
       connection.query(query, (e,r,f) => {
       res.json({'message': 'Add successfully.', 'users':r});
    });
});

// list
app.get('/list', (req, res) => {
         query = 'SELECT * FROM Users;';
         connection.query(query, (e,r,f) => {
         res.json({'users':r});
    });
});


// clear
app.post('/clear', (req, res) => {
       query = 'DELETE FROM Users';
       connection.query(query, (e,r,f) => {
       res.json({'message': 'Delete all users successfully.', 'users': r});
     });
});

var http = require('http').Server(app);

const PORT = 80;
http.listen(PORT, function() {
       console.log('Listening');

});
