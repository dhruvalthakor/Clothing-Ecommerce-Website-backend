const express = require("express");

const auth = require("../middleware/auth");
const cartmodel = require("../model/cartmodel");
const productmodel = require("../model/productmodel");
const cartRouter = express.Router();

// Get all carts for a user
cartRouter.get("/", auth, async (req, res) => {
  try {
    const userId = req.body.userid;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const carts = await cartmodel.find({ userid: userId });

    res.status(200).json({ carts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch carts", error: error.message });
  }
});

// Add a new cart (Update quantity if product already exists)
cartRouter.post("/addcart/:id", auth, async (req, res) => {
  try {
    const cartId = req.params.id;
    const { size, quantity, userid } = req.body;

    if (!userid) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const product = await productmodel.findById(cartId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

  
    const cartdata = await cartmodel.find({ userid });

  
    const existingCartItem = cartdata.find((data) => data.product._id == cartId);


    if (existingCartItem) {
    existingCartItem.quantity =+existingCartItem.quantity + 1;
      
      
      await existingCartItem.save();

      return res.status(200).json({ message: "Cart updated successfully", updatedCart: existingCartItem });
    } else {
      // Product not in cart, add a new entry
      const newCart = await cartmodel.create({ userid, product, size, quantity });

      return res.status(201).json({ message: "Cart added successfully", newCart });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add cart", error: error.message });
  }
});

// Delete a cart by ID
cartRouter.delete("/deletecart/:id", auth, async (req, res) => {
  try {
    const cartId = req.params.id;
    const userId = req.body.userid;

    if (!cartId) {
      return res.status(400).json({ message: "Cart ID is required" });
    }

    await cartmodel.findByIdAndDelete(cartId);

    // Return updated cart list after deletion
    const carts = await cartmodel.find({ userid: userId });

    res.status(200).json({ message: "Cart deleted successfully", carts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete cart", error: error.message });
  }
});

module.exports = cartRouter;
