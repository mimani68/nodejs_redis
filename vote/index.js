require('dotenv').config();

const PORT = require('./src/config/app').config.port;
var app = require('./src/app');

app.listen(PORT, ()=>{
    console.log(`run fake server on port ${PORT}`)
})