const express = require('express')
const libroRouter = express.Router()

// declaramos un objeto en nuestro modelo 
let libro = require('../models/libro')

//Agregar un libro nuevo 
libroRouter.route('/agregar').post((req, res) => {
    libro.create(req.body)
.then((data) =>{
    console.log('Se inserto un libro nuevo')
    res.send(data)
})
.catch((error) => {
    console.error(error)
})
})

//Obtener todos los libros de la base de datos 
libroRouter.route('/libros').get((req, res) => {
    libro.find()
    .then((data) => {
        res.send(data)
    })
    .catch((error) =>{
        console.error(error)
    })
})

//Obtener un sólo libro por su ID 
libroRouter.route('/libro/:id').get((req, res) => {
    libro.findById(req.params.id)
    .then((data) => {
        res.send(data)
    })
    .catch((error) =>{
        console.error(error)
    })
})

//Actualizar un libro
libroRouter.route('/actualizar/:id').put((req, res) => {
    libro.findByIdAndUpdate(req.params.id,{
        $set :req.body
    })
    .then((data) => {
        console.log('Se actualizo el libro seleccionado')
        res.send(data)
    })
    .catch((error) =>{
        console.error(error)
    })
})

//Eliminar un libro 
libroRouter.route('/delete/:id').delete((req,res) =>{
    libro.findByIdAndDelete(req.params.id)
    .then((data) => {
        console.log('Se elimino el libro')
        res.send(data)
    })
    .catch((error) =>{
        console.error(error)
    })
})

module.exports = libroRouter;