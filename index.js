const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const createError = require('http-errors'); // Importa el módulo createError

// Conexión con la base de datos
mongoose
    .connect('mongodb+srv://gabrielaszti21:1234@libros.joxikaj.mongodb.net/libros?retryWrites=true&w=majority&appName=libros')
    .then((x) => {
        console.log(`Conectado exitosamente a la base ${x.connections[0].name}`);
    })
    .catch((error) => {
        console.log('Error de conexión: ', error.reason);
    });

// Configuración del servidor web
const libroRouter = require('./routes/libro.routes');
const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

app.use(cors());

app.use('/api', libroRouter);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// Habilitar el puerto
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Escuchando en el puerto ' + port);
});

// Manejar posibles errores 404
app.use((req, res, next) => {
    next(createError(404));
});

// Manejar errores
app.use(function (err, req, res, next) {
    console.log(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
