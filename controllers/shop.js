const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getProduct = async (req, res, next) => {
  const pid = req.params.productId;
  try {
    const product = await Product.findByPk(pid);
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getIndex = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.postCart = async (req, res, next) => {
  const pid = req.body.productId;
  try {
    const product = await Product.findByPk(pid);
    await Cart.create({ productId: pid, price: product.price });
    res.redirect('/cart');
  } catch (err) {
    console.log(err);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const cartItems = await Cart.findAll();
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: cartItems
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

exports.postDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  try {
    await Product.destroy({ where: { id: prodId } });
    res.redirect('/admin/products');
  } catch (err) {
    console.log(err);
  }
};
