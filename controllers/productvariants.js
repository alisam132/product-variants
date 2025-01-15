const express = require("express");

const router = express.Router();

const Productvariants = require("../models/product-variant.js");

router.get("/", async (req, res) => {
  const allProductvariants = await Productvariants.find();
  res.render("productvariants/index.ejs", { productvariant: allProductvariants });
});

router.get("/new", (req, res) => {
  res.render("productvariants/new.ejs");
});

router.get("/:productvariantId", async (req, res) => {
  const foundProductVariantId = await Productvariants.findById(req.params.productvariantId);
  res.render("productvariants/show.ejs", { productvariant: foundProductVariantId });
});

router.get("/:productvariantId/edit", async (req, res) => {
  const foundProductVariantId = await Productvariants.findById(req.params.productvariantId);
  res.render("productvariants/edit.ejs", { productvariant: foundProductVariantId });
});

// POST /products
router.post("/", async (req, res) => {
  await Productvariants.create(req.body);
  res.redirect("/productvariants");
});

//update
router.put("/:productvariantId", async (req, res) => {
  await Productvariants.findByIdAndUpdate(req.params.productvariantId, req.body);
  res.redirect("/productvariants");
});

// delete
router.delete("/:productvariantId", async (req, res) => {
  await Productvariants.findByIdAndDelete(req.params.productvariantId);
  res.redirect("/productvariants");
});

module.exports = router;
