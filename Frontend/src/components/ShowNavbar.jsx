import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';

function ShowNavbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/" className="text-lg font-bold hover:text-gray-200">Home</Link>
          {!user ? (
            <>
              <Link to="/signup" className="hover:text-gray-200">Signup</Link>
              <Link to="/login" className="hover:text-gray-200">Login</Link>
            </>
          ) : (
            <>
              {user.role === 'admin' ? (
                <>
                  <Link to="/adminDashboard" className="hover:text-gray-200">Add Product</Link>
                </>
              ) : (
                <>
                  <Link to="/customer" className="hover:text-gray-200">Get All Products</Link>
                  <Link to="" className="hover:text-gray-200">Featured Products</Link>
                  <Link to="" className="hover:text-gray-200">Products Under Price</Link>
                  <Link to="" className="hover:text-gray-200">Products Over Price</Link>
                </>
              )}
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-700 text-white py-1 px-4 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default ShowNavbar;
