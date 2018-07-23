var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var hotelSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    calificacion: { type: Number, required: true },
    precio: { type: Number, required: true },
    descuento: { type: Number }
});

module.exports = mongoose.model('Hotel', hotelSchema);