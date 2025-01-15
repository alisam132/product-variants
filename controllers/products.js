const express = require("express");

const router = express.Router();

const Product = require("../models/product.js");
const Productvariants = require("../models/product-variant.js");

router.get("/", async (req, res) => {
  const allProducts = await Product.find();
  res.render("products/index.ejs", { product: allProducts });
});

router.get("/new", async (req, res) => {
  const allProductvariants = await Productvariants.find();
  res.render("products/new.ejs", { Productvariants: allProductvariants });
});

router.get("/:productId", async (req, res) => {
  const foundProduct = await Product.findById(req.params.productId);
  res.render("products/show.ejs", { product: foundProduct });
});

router.get("/:productId/edit", async (req, res) => {
  const foundProduct = await Product.findById(req.params.productId);
  res.render("products/edit.ejs", { product: foundProduct });
});

// POST /products
router.post("/", async (req, res) => {
  await Product.create(req.body);
  res.redirect("/products");
});

//update
router.put("/:productId", async (req, res) => {
  await Product.findByIdAndUpdate(req.params.productId, req.body);
  res.redirect("/products");
});

// delete
router.delete("/:productId", async (req, res) => {
  await Product.findByIdAndDelete(req.params.productId);
  res.redirect("/products");
});

module.exports = router;
