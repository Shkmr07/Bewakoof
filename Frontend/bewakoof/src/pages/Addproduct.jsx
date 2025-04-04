import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from "../redux/reducers/productSlice"; // Adjust path
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const { status, error } = useSelector((state) => state.product); // Get status and error from productSlice

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    images: [],
    ratings: 0,
  });

  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    setProductData({ ...productData, images: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in productData) {
      if (key === 'images') {
        if (productData.images.length > 0) {
          for (let i = 0; i < productData.images.length; i++) {
            formData.append('photo', productData.images[i]);
          }
        }
      } else {
        formData.append(key, productData[key]);
      }
    }
    console.log(formData)
    dispatch(createProduct(formData))
      .unwrap()
      .then(() => {
        toast.success('Product added successfully!');
        setProductData({
          name: '',
          description: '',
          price: 0,
          category: '',
          stock: 0,
          images: [],
          ratings: 0,
        });
        navigate("/") // navigate to products page after success.
      })
      .catch((err) => {
        toast.error(error || 'Failed to add product.');
      });
  };

  return (
    <>
      <Navbar />
      <main className="flex items-center p-4 justify-center min-h-[calc(100vh-120px)] bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Add Product</h1>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="description"
                value={productData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                Price
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                Category
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="category"
                value={productData.category}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
                Stock
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                name="stock"
                value={productData.stock}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
                Images
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="file"
                name="photo"
                multiple
                onChange={handleImageChange}
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Adding...' : 'Add Product'}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}