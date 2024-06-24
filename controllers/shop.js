const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const pid = req.params.productId;
  Product.findById(pid)
    .then(([product]) => {
      res.render("shop/product-detail", {
        product: product[0],
        pageTitle: product[0].title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/index", {
        prods: rows,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const pid = req.body.productId;
  Product.findById(pid)
    .then(([product]) => {
      return Cart.addProduct(pid, product[0].price);
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
}

exports.getCart = (req, res, next) => {
  Cart.fetchCart()
    .then(([rows, fieldData]) => {
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: rows
      });
    })
    .catch(err => console.log(err));
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

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};
