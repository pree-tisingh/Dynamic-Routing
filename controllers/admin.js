const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = async (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  try {
    await req.user.createProduct({
      title,
      imageUrl,
      price,
      description
    });
    res.redirect('/admin/products'); // Redirect to admin products after adding
  } catch (err) {
    console.log(err);
  }
};

exports.getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  try {
    const product = await req.user.getProducts({ where: { id: prodId } });
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: true,
      product: product[0]
    });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
};

exports.postEditProduct = async (req, res, next) => {
  const { productId, title, imageUrl, price, description } = req.body;
  try {
    const product = await Product.findByPk(productId);
    if (product) {
      product.title = title;
      product.imageUrl = imageUrl;
      product.price = price;
      product.description = description;
      await product.save();
      res.redirect('/admin/products');
    } else {
      res.redirect('/');
    }
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await req.user.getProducts();
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  } catch (err) {
    console.log(err);
  }
};

exports.postDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  try {
    await Product.destroy({ where: { id: prodId } });
    res.redirect('/admin/products');
  } catch (err) {
    console.log(err);
    res.redirect('/admin/products');
  }
};
