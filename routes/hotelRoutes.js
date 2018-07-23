var express = require('express');
var router = express.Router();
var hotel = require('../controllers/hotelController.js');

router.get('/list', hotel.list);

router.get('/filter', hotel.filter);

router.get('/findByName', hotel.findByName);

router.post('/save', hotel.save);

module.exports = router;