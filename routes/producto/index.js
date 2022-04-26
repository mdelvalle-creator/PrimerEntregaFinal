const express = require('express');
const router = express.Router();

const Contenedor = require('../../Contenedor');
const authorize = require('../../auth/authorization');

const productoContainer = new Contenedor(`${__dirname}/producto.txt`);

// Get all products
router.get("/productos", async (request, response) => {
  const results = await productoContainer.getAll();
  response.json(results);
});

// Save new product
router.post("/productos", authorize('admin'), async (request, response) => {
  const results = await productoContainer.save(request.body);
  response.json(results);
});

// Get a specific product
router.get("/productos/:id", async (request, response) => {
  let results = await productoContainer.getById(parseInt(request.params.id,10));
  if(!results){
    results = {error: 'producto no encontrado'};
  }
  response.json(results);
});

// Update a specific product
router.put("/productos/:id", authorize('admin'), async (request, response) => {
  let results;
  let product = await productoContainer.getById(parseInt(request.params.id,10));
  if(!product){
    results = {error: 'producto no encontrado'};
  }else{
    results = await productoContainer.update(parseInt(request.params.id,10),request.body);
  }
  response.json(results);
});

// Delete a specific product
router.delete("/productos/:id", authorize('admin'), async (request, response) => {
  let results;
  let product = await productoContainer.getById(parseInt(request.params.id,10));
  if(!product){
    results = {error: 'producto no encontrado'};
  }else{
    await productoContainer.deleteById(parseInt(request.params.id,10),request.body);
  }
  response.json({mensaje: 'producto eliminado'});
});

module.exports = router;