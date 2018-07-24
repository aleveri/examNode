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
    var stars = parseInt(req.query.calificacion);
    if (isNaN(stars)) { throw new Error("La calificación debe ser númerica."); }
    if (stars > 0) {
      Hotel.find({ 'name': req.query.name, 'stars': stars }).exec()
        .then(data => res.json(data))
        .catch(err => res.json(err));
    }
    if (stars < 1) {
      Hotel.find({ 'name': req.query.name }).exec()
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