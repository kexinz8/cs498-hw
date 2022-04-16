const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const fs = require('fs');
const PythonShell = require('python-shell').PythonShell;

// initialize web app
const app = express();
app.use(bodyParser.json());

//  Handle customized Mapreduce task
app.post('/analyze', (req, res) => {
        res.send('Task Started!');
         let wordlist  = req.body.wordlist;
         console.log(wordlist);
         let weights = JSON.stringify(req.body.weights);
         console.log(weights);
          var options={args:['/home/judith06zhukexin/myproj/input.txt', wordlist, weights, 'output5']};
         PythonShell.run('spark3.py', options, function (err, results) {
                 if (err) throw err;  console.log('results: %j', results);
          });       

});

// return result from to mapreduce task
app.get('/result', (req,res) => {
    fs.readFile('/home/judith06zhukexin/myproj/output5/combined.json', 'utf8', (error, data) => {
            if(error){
               console.log(error);
               return;
     }
     console.log(JSON.parse(data));
     res.send(JSON.parse(data));
  });

});

// lengthCount request returning with a json file
app.get('/lengthCounts', (req,res) => {
    fs.readFile('/home/judith06zhukexin/myproj/output1/combined.json', 'utf8', (error, data) => {
         if(error){
            console.log(error);
            return;
  }
  console.log(JSON.parse(data));
  res.send(JSON.parse(data));
});
});

var http = require('http').Server(app);

const PORT = 80;
http.listen(PORT, function() {
          console.log('Listening');

});

