const express = require("express")
const app = express()

const exec = require('child_process').exec;
app.get('/', (req, res)=>{
    const isRunning = (query, cb) => {
        let platform = process.platform;
        let cmd = '';
        switch (platform) {
            case 'win32' : cmd = `tasklist`; break;
            case 'darwin' : cmd = `ps -ax | grep ${query}`; break;
            case 'linux' : cmd = `ps -A`; break;
            default: break;
        }
        exec(cmd, (err, stdout, stderr) => {
            cb(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
        });
    }
    
    // isRunning('CamtasiaStudio.exe', (status) => {
    //     console.log(status); // true|false
    // })
    isRunning('CamtasiaRecorder.exe', (status) => {
        console.log(status); // true|false
        res.send(status)
    })
})
app.listen(3000)