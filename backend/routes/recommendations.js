import express from "express";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const userOrders = await Order.find({ user: req.user._id }).populate(
      "orderItems.product"
    );

    const purchasedCategories = new Set();
    userOrders.forEach((order) => {
      order.orderItems.forEach((item) => {
        if (item.product && item.product.category) {
          purchasedCategories.add(item.product.category);
        }
      });
    });

    let recommendedProducts = [];

    if (purchasedCategories.size > 0) {
      recommendedProducts = await Product.find({
        category: { $in: Array.from(purchasedCategories) },
        stock: { $gt: 0 },
      })
        .limit(8)
        .sort({ rating: -1, createdAt: -1 });
    }

    if (recommendedProducts.length < 8) {
      const popularProducts = await Product.find({
        stock: { $gt: 0 },
        _id: { $nin: recommendedProducts.map((p) => p._id) },
      })
        .limit(8 - recommendedProducts.length)
        .sort({ rating: -1, numReviews: -1 });

      recommendedProducts = [...recommendedProducts, ...popularProducts];
    }

    res.json(recommendedProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/popular", async (req, res) => {
  try {
    const popularProducts = await Product.find({ stock: { $gt: 0 } })
      .limit(8)
      .sort({ rating: -1, numReviews: -1 });

    res.json(popularProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
