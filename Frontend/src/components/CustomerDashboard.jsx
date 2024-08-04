import React, { useEffect, useState } from "react";
import axios from "axios";

function CustomerDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://assigment-sable.vercel.app/getallProduct"
        );
        console.log("API Response:", response.data);
        setProducts(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (products.length === 0) {
    return <div className="flex justify-center items-center min-h-screen">No products available.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div 
            key={product._id} 
            className="card bg-white shadow-md rounded-lg p-4"
          >
            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
            <p className="text-gray-700 mb-2">Price: ${product.price}</p>
            <p className="text-gray-500 mb-2">Product Featured : ${product.featured ? "true" : ""}</p>
            <p className="text-gray-500">Company:${product.company}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerDashboard;
