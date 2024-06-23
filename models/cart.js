const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      const existingProductIndex = cart.products.findIndex((prod) => pid === id);
      const existingProduct = cart.products[existingProductIndex];
      let updateProject;
      if (existingProduct) {
        updateProject = { ...existingProduct };
        updateProject.qty = updateProject.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProduct] = updateProject;
      } else {
        updateProject = {id: id , qty:1};
        cart.products = [...cart.products , updateProject];
      }
      cart = cart.totalPrice + productPrice;
      fs.write(p , JSON.stringify(cart),err=>{
        console.log(err);
      })
    });
  }
};
