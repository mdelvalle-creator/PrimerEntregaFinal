const express = require('express');
const router = express.Router();

const Contenedor = require('../../Contenedor');

const carritoContainer = new Contenedor(`${__dirname}/carrito.txt`);

// Get all products
router.get("/carrito/", async (request, response) => {
  const results = await carritoContainer.getAll();
  response.json(results);
});

// Save new product
router.post("/carrito", async (request, response) => {
  const results = await carritoContainer.save(request.body);
  response.json(results);
});

// Get a specific product
router.get("/carrito/:id", async (request, response) => {
  let results = await carritoContainer.getById(parseInt(request.params.id,10));
  if(!results){
    results = {error: 'producto no encontrado'};
  }
  response.json(results);
});

// Update a specific product
router.put("/carrito/:id", async (request, response) => {
  let results;
  let product = await carritoContainer.getById(parseInt(request.params.id,10));
  if(!product){
    results = {error: 'producto no encontrado'};
  }else{
    results = await carritoContainer.update(parseInt(request.params.id,10),request.body);
  }
  response.json(results);
});

// Delete a specific product
router.delete("/carrito/:id", async (request, response) => {
  let results;
  let product = await carritoContainer.getById(parseInt(request.params.id,10));
  if(!product){
    results = {error: 'producto no encontrado'};
  }else{
    await carritoContainer.deleteById(parseInt(request.params.id,10),request.body);
  }
  response.json({mensaje: 'producto eliminado'});
});

module.exports = router;