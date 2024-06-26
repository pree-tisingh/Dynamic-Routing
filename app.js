const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const db = require('./util/database');
const sequelize = require('./util/database');
const User = require('./models/user');
const Product = require('./models/product');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');



const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

Product.belongsTo(User, { constraints: true  , onDelete:'CASCADE'});
User.hasMany(Product);

app.use(errorController.get404);

app.use((req, res, next) => {
    User.findByPk(1)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });

sequelize
  .sync({ force: false }) 
  .then(result => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'John Doe', email: 'john.doe@example.com' });
    }
    return user;
  })
  .then(user => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });