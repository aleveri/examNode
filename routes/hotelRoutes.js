var express = require('express');
var router = express.Router();
var hotel = require('../controllers/hotelController.js');

router.get('/list', hotel.list);

router.get('/filter', hotel.filter);

router.post('/save', hotel.save);

router.put('/update', hotel.update);

router.delete('/delete', hotel.delete);

module.exports = router;