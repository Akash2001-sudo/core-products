const Product = require("../models/productModel");

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500);
    throw new Error("Server Error");
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error("Server Error");
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Public
const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!name || !description || price === undefined) {
      res.status(400).json({ status: 400, message: "Name, description and price are required" });
      return;
    }

    // normalize incoming name for comparison
    const normalized = String(name).trim().toLowerCase();

    // check for existing product (case-insensitive)
    const existing = await Product.findOne({ name: normalized });
    if (existing) {
      res.status(400).json({ status: 400, message: "Product with this name already exists" });
      return;
    }

    const product = await Product.create({
      name: normalized,
      description,
      price,
    });
    res.status(201).json({ status: 201, product });
  } catch (error) {
    // handle duplicate key error (race conditions)
    if (error && error.code === 11000) {
      res.status(400).json({ status: 400, message: "Product with this name already exists" });
      return;
    }

    res.status(400).json({ status: 400, message: "Invalid product data" });
    return;
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Public
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = req.body.name || product.name;
      product.description = req.body.description || product.description;
      product.price = req.body.price || product.price;

      const updatedProduct = await product.save();
      res.status(200).json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error("Server Error");
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Public
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.status(200).json({ message: "Product removed" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error("Server Error");
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
