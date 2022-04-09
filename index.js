const cluster = require('cluster');

// is the file is being executed in master mode ?
if(cluster.isMaster){
    // Cause index.js to be executed *again* but child mode
    cluster.fork();
} else {
    // I am a child, I am going to act like a server
    const express = require('express');
    const app = express();
    const port = 3000;

    function doWork(duration) {
        const start = Date.now();
        while(Date.now() - start < duration){

        }
    }

    app.get('/',(req,res) => {
        doWork(5000);
        res.send('Hi There');
    });

    app.get('/fast',(req,res) => {
        res.send('Fast!!')
    })

    app.listen(port,() => {
        console.log('Running on port '+ port);
    });

}