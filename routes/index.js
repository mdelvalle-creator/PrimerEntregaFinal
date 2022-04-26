const express = require('express');
const router = express.Router();

const carrito = require('./carrito');
const producto = require('./producto');

router.use(carrito);
router.use(producto);

module.exports = router;
