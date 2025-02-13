const express = require("express");
const productmodel = require("../model/productmodel");
const productrouter = express.Router();


productrouter.get("/",async (req, res) => {
  try {
    const product = await productmodel.find();
    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch carts", error: error.message });
  }
});
// Add Product
productrouter.post("/addproduct", async (req, res) => {
  try {
    
    await productmodel.create(req.body);
    res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to add product" });
  }
});

// Delete Product
productrouter.delete("/deleteproduct/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const deletedProduct = await productmodel.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete product" });
  }
});

// Edit Product
productrouter.put("/editproduct/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const updates = req.body;

    if (!productId || !updates) {
      return res.status(400).json({ message: "Product ID and updates are required" });
    }

    const updatedProduct = await productmodel.findByIdAndUpdate(productId, updates, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update product" });
  }
});

module.exports = productrouter;
