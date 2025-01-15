require('dotenv').config();
require('./config/database');
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const passUserToView = require('./middleware/pass-user-to-view');
const isSignedIn = require('./middleware/is-signed-in');
const path = require('path');

//controllers
const authCtrl = require('./controllers/auth');
const productsCtrl = require('./controllers/products');
const productVariantsCtrl = require('./controllers/productvariants');
const Product = require('./models/product.js');
const ProductVariant = require('./models/product-variant.js');

const port = process.env.PORT ? process.env.PORT : '3000';


// MIDDLEWARE

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride('_method'));
// Morgan for logging HTTP requests
app.use(express.static(path.join(__dirname, 'static')));
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passUserToView);

app.get("/", async (req, res) => {
  const allProductsCount = await Product.find()
  const allProductVariantCount = await ProductVariant.find()
  res.render('index.ejs', {productCount: allProductsCount.length, ProductVariantCount : allProductVariantCount.length});
});



app.use('/auth', authCtrl);
app.use('/products', productsCtrl);
app.use('/productvariants', productVariantsCtrl);


app.use(isSignedIn);

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});