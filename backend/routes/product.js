const router = require('express').Router();
let Product = require('../models/product.model');

router.route('/').get((req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const sku = req.body.sku;
  const name = req.body.name;
  const type = req.body.type;
  const price = Number(req.body.price);

  const newProduct = new Product({
    sku,
    name,
    type,
    price,
  });

  newProduct.save()
  .then(() => res.json('Product added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Product.findById(req.params.id)
  .then(products => res.json(products))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Product.findByIdAndDelete(req.params.id)
  .then(() => res.json('Product deleted.'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Product.findById(req.params.id)
  .then(products => {
    products.sku = req.body.sku;
    products.name = req.body.name;
    products.type = req.body.type;
    products.price = Number(req.body.price);
  
    products.save()
    .then(() => res.json('Products updated!'))
    .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/:sku', function(req, res) {
  let sku = req.params.sku;
  Product.find({sku: sku}, 
    function(error, product) {
      if(error){
        res.json(error);
      } else if(product == null){
        res.json('Product not found!')
      } else {
        res.json(product);    
      }
    });
});

module.exports = router;