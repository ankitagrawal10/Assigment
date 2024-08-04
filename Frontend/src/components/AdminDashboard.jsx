import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "./AuthProvider"; // Adjust the path as needed

function AdminDashboard() {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const [featured, setFeatured] = useState(false);
  const [rating, setRating] = useState(0);
  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Add Product</h2>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Product ID</span>
        </label>
        <input
          type="text"
          placeholder="Enter Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="input input-bordered w-full"
          required
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Product Name</span>
        </label>
        <input
          type="text"
          placeholder="Enter Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full"
          required
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Price</span>
        </label>
        <input
          type="text"
          placeholder="Enter Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="input input-bordered w-full"
          required
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Company Name</span>
        </label>
        <input
          type="text"
          placeholder="Enter Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="input input-bordered w-full"
          required
        />
      </div>

      <div className="form-control">
        <label className="cursor-pointer label">
          <span className="label-text">Featured</span>
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="checkbox checkbox-primary"
          />
        </label>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Rating (0-5)</span>
        </label>
        <input
          type="number"
          placeholder="Enter Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="input input-bordered w-full"
          min="0"
          max="5"
          step="0.1"
        />
      </div>

      <button type="submit" className="btn btn-primary w-full">
        Add Product
      </button>
    </form>
  );
}

export default AdminDashboard;
