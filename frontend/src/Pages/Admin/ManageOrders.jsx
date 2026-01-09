import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders");
        setOrders(response.data);
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleUpdateOrder = async (orderId, status) => {
    try {
      await axios.patch(`/api/orders/${orderId}`, { status });
      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? { ...order, status } : order))
      );
    } catch (error) {
      console.log("Error updating order:", error);
    }
  };

  return (
    <div className="manage-orders">
      <h2>Manage Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <span>{order.productId} - Status: {order.status}</span>
            <button onClick={() => handleUpdateOrder(order._id, "Completed")}>Mark as Completed</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageOrders;
