const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false
    
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null , title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};



exports.getEditProduct = (req, res, next) => {
  let editMode = req.query.edit;
  if(!editMode){
    res.redirect('/');
  }
  const pid = req.params.productId;
  Product.findById(pid, product =>{
    if(!product){
      return res.redirect('/');
    }

    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  })
  
};

exports.postEditProduct= (req,res,next)=>{
 const pid = req.body.productId;
 const updateTitle = req.body.title;
 const updateImageUrl = req.body.imageUrl;
 const updatePrice = req.body.price;
 const updateDescription = req.body.description;
 const upadteProducts = new Product(pid, updateTitle , updateImageUrl , updatePrice , updateDescription);
 upadteProducts.save();
 res.redirect('/admin');
}


exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
