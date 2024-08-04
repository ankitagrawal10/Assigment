import Product from "../model/product.js";

export const addProduct = async (req, res) => {
    try {
      const { productId, name, price, featured, rating, createdAt, company } = req.body;
  
      const isFeatured = featured === 'true' || featured === true;
  
      if (!productId || !name || !price || isFeatured === undefined || !company) {
        return res.status(400).json({ message: "Please provide all the required fields" });
      }
  
      const newProduct = new Product({
        productId,
        name,
        price,
        featured: isFeatured,
        rating,
        createdAt,
        company,
      });
  
      await newProduct.save();
      return res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
      console.error("Error: " + error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find({});
      return res.status(200).json(products);
    } catch (error) {
      console.error("Error: " + error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateProduct = async (req, res) => {
    try {
      const { productId, name, price, featured, company } = req.body;
  
      const product = await Product.findOne({ productId });
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      if (product.productId !== productId) {
        return res.status(400).json({ message: "Product ID mismatch" });
      }
  
      if (name) product.name = name;
      if (price) product.price = price;
      if (featured !== undefined) product.featured = featured;
      if (company) product.company = company;
  
      const updatedProduct = await product.save();
  
      return res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
      console.error("Error: " + error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
      const { productId } = req.body;
  
      const product = await Product.findOne({ productId });
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      if (product.productId !== productId) {
        return res.status(400).json({ message: "Product ID mismatch" });
      }
  
      await product.deleteOne();
  
      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error: " + error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
};


export const getFeaturedProducts = async (req, res) => {
    try {
      const featuredProducts = await Product.find({ featured: true });
      if (!featuredProducts) {
        return res.status(404).json({ message: "No featured products found" });
      }
  
      return res.status(200).json(featuredProducts);
    } catch (error) {
      console.error("Error: " + error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getProductsByLessPrice = async (req, res) => {
    try {
      const { minPrice } = req.query;
  
      if (!minPrice || isNaN(minPrice)) {
        return res.status(400).json({ message: "Invalid or missing maxPrice parameter" });
      }
  
      const priceLimit = parseFloat(minPrice);
  
      const products = await Product.find({ price: { $lte: priceLimit } });
  
      if (products.length === 0) {
        return res.status(404).json({ message: "No products found under the specified price" });
      }
  
      return res.status(200).json(products);
    } catch (error) {
      console.error("Error: " + error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getProductsByGreaterPrice = async (req, res) => {
    try {
      const { maxPrice } = req.query;
  
      if (!maxPrice || isNaN(maxPrice)) {
        return res.status(400).json({ message: "Invalid or missing maxPrice parameter" });
      }
  
      const priceLimit = parseFloat(maxPrice);
  
      const products = await Product.find({ price: { $gte: priceLimit } });
  
      if (products.length === 0) {
        return res.status(404).json({ message: "No products found under the specified price" });
      }
  
      return res.status(200).json(products);
    } catch (error) {
      console.error("Error: " + error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
};


  

