import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: [true, 'Product ID is required'],
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Product name is required'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  featured: {
    type: Boolean,
    default: false
  },
  rating: {
    type: mongoose.Types.Decimal128,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5'],
    default: 0
  },
  createdAt: {
    type: Date,
    required: [true, 'Creation date is required'],
    default: Date.now
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
  }
});

const Product = mongoose.model('Product', productSchema);
export default Product;
