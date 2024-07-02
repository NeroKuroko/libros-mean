const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Libro = new Schema({
    titulo : {
        type : String 
    },
    genero : {
        type: String
    }, 
    autor : {
        type : String
    }, 
    anio_publicacion : {
        type : Number
    }
} , {
    collection : 'libros'
})

module.exports = mongoose.model('Libro', Libro)