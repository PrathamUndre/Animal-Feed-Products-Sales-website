import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ title: "", price: 0, quantity: 0 });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    try {
      await axios.post("/api/products", newProduct);
      setProducts((prev) => [...prev, newProduct]);
      setNewProduct({ title: "", price: 0, quantity: 0 });
    } catch (error) {
      console.log("Error adding product:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`/api/products/${productId}`);
      setProducts((prev) => prev.filter((product) => product._id !== productId));
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };

  return (
    <div className="manage-products">
      <h2>Manage Products</h2>
      <div className="add-product">
        <input
          type="text"
          placeholder="Title"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <span>{product.title} - ${product.price}</span>
            <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageProducts;
