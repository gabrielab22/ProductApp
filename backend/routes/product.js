const express = require("express");
const router = express.Router();
const { Product, Company } = require("../models");

router.post("", async (req, res) => {
  try {
    const { name, price, type, availability, companyId } = req.body;
    const product = await Product.create({
      name,
      price,
      type,
      availability,
      companyId,
    });
    res.status(201).json(product);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to create a new product" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to retrieve products" });
  }
});

router.get("/by-company/:companyId", async (req, res) => {
  try {
    const { companyId } = req.params;
    const products = await Product.findAll({
      where: {
        companyId: companyId,
      },
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Failed to retrieve products by companyId" });
  }
});

router.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to retrieve the product" });
  }
});

router.put("/update/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, price, type, availability, companyId } = req.body;
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.update({
      name,
      price,
      type,
      availability,
      companyId,
    });

    res.status(200).json(product);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to update the product" });
  }
});

router.delete("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByPk(productId);

    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found with Id:", productId });
    }

    await product.destroy();
    res.status(500).json({ message: "Succes deleted product" });

    res.status(204).end();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to delete the product" });
  }
});

module.exports = router;
