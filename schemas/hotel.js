var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var hotelSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    stars: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    amenities: { type: [String], required: true }
});

module.exports = mongoose.model('Hotel', hotelSchema);