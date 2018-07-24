var mongoose = require('mongoose');
var Hotel = mongoose.model("Hotel");

var hotelController = {};

hotelController.list = function (req, res) {
  try {
    var pagina = parseInt(req.query.pagina);
    var cantidad = parseInt(req.query.cantidadPagina);
    if (isNaN(pagina) || isNaN(cantidad)) { throw new Error("La paginacion debe ser númerica."); }
    Hotel.find({}).skip(pagina - 1).limit(cantidad).exec()
      .then(data => res.json(data))
      .catch(err => res.json(err));
  } catch (error) {
    res.status(400).send(error.message);
  }
};

hotelController.filter = function (req, res) {
  try {
    var calificacionMax = parseInt(req.query.calificacionMax);
    var calificacionMin = parseInt(req.query.calificacionMin);
    var precioMax = parseInt(req.query.precioMax);
    var precioMin = parseInt(req.query.precioMin);

    if (isNaN(calificacionMin) ||
      isNaN(calificacionMax) ||
      isNaN(precioMax) ||
      isNaN(precioMin)) { throw new Error("La calificación y el precio deben ser numericos"); }

    if (calificacionMin > 0 && calificacionMax > 0 && precioMin < 1 && precioMax < 1) {
      Hotel.find({ 'calificacion': { $gt: calificacionMin, $lt: calificacionMax } }).exec()
        .then(data => res.json(data))
        .catch(err => res.json(err));
    }

    if (calificacionMin < 1 && calificacionMax < 1 && precioMin > 0 && precioMax > 0) {
      Hotel.find({ 'precio': { $gt: precioMin, $lt: precioMax } }).exec()
        .then(data => res.json(data))
        .catch(err => res.json(err));
    }

    if (calificacionMin > 0 && calificacionMax > 0 && precioMin > 0 && precioMax > 0) {
      Hotel.find({ 'precio': { $gt: precioMin, $lt: precioMax }, 'calificacion': { $gt: calificacionMin, $lt: calificacionMax } }).exec()
        .then(data => res.json(data))
        .catch(err => res.json(err));
    }

  } catch (error) {
    res.status(400).send(error.message);
  }
};

hotelController.save = function (req, res) {
  var hotel = new Hotel(req.body);
  hotel.save()
    .then(x => { res.json({}) })
    .catch(err => res.json(err));
};

hotelController.update = function (req, res) {
  Hotel.updateOne({ '_id': req.body._id }, req.body)
    .then(x => { res.json({}) })
    .catch(err => res.json(err));
};

hotelController.delete = function (req, res) {
  Hotel.deleteOne({ '_id': req.query.id })
    .then(x => { res.json({}) })
    .catch(err => res.json(err));
};

module.exports = hotelController;