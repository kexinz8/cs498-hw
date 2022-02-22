const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');

// connect to a mysql database
var connection = mysql.createConnection({
        host : 'localhost',
        user : 'master',
        password : 'cs498db',
        database : 'mydb'
});
connection.connect();

// initialize web app
const app = express();
app.use(bodyParser.json());


// Handle greeting request to the base IP/URL
app.get('/greeting', (req,res) => {
        res.send('Hello World!');
});

// Handle insert operations(register) to our databse
app.post('/register', (req, res) => {
         let n = req.body.username;
         n = n.replace(/^[0-9\s]*|[+*\r\n]/g, '');
         query = `INSERT INTO Users (username) VALUES ('`+n+`');`;
         connection.query(query, (e,r,f)=> {
                   console.log(r);
                   res.json({'message': 'Add successfully.', 'users':r});
         });
});

// Handle query all users in the databse
app.get('/list', (req, res) => {
         query = 'SELECT  *  FROM Users;';
         connection.query(query, (e,r,f) => { 
         res.json({'users':r});
         
        });
   });
   // Clear all users when receiving a post request
app.post('/clear', (req, res) => {
           query = 'DELETE FROM Users;';
           connection.query(query, (e,r,f) => {
           res.json({'message': 'Delete all users successfully.', 'users':r});
          });
   });
var http = require('http').Server(app);


const PORT = 80;
http.listen(PORT, function() {
           console.log('Listening');

});
