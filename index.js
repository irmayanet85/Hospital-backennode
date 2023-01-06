/*jshint esversion: 6 */
/*jshint esversion: 8 */

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/db.config');
require('dotenv').config();

const path = require('path'); 

//crear el servidor de aplicaciones de express
const app = express();
//base de datos
dbConnection();

//cors
app.use(cors());

//lectura y parseo del body otro midleware
app.use(express.json());

//la carpeta que va a brir por defecto en la raiz

app.use(express.static('public'));


app.use('/api/usuarios', require('./routes/usuario'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medico'));

app.use('/api/search', require('./routes/search'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/download', require('./routes/download'));

//para el error de que cuando el usuario recarga el navegador da un error con el get
app.get('*',(req,res) => {
res.sendFile(path.resolve(__dirname,'public/index.html'));
});
 

app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
  });
