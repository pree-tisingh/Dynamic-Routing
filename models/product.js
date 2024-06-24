const db = require('../util/database');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    if (this.id) {
      return db.execute(
        'UPDATE products SET title = ?, imageUrl = ?, description = ?, price = ? WHERE id = ?',
        [this.title, this.imageUrl, this.description, this.price, this.id]
      );
    } else {
      return db.execute(
        'INSERT INTO products (title, imageUrl, description, price) VALUES (?, ?, ?, ?)',
        [this.title, this.imageUrl, this.description, this.price]
      );
    }
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  }

  static deleteById(id) {
    return db.execute('DELETE FROM products WHERE products.id = ?', [id]);
  }
};
