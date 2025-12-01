import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Get auth token for API requests
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Checkout - create order
export const checkout = async (subtotal, total, duocDiscount, levelDiscount, discountApplied) => {
  try {
    const response = await axios.post(`${API_URL}/orders/checkout`, {
      subtotal,
      total,
      duocDiscount,
      levelDiscount,
      discountApplied
    }, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('Error al procesar el checkout:', error);
    throw error;
  }
};

// Get user orders
export const getUserOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders/my`, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener pedidos del usuario:', error);
    throw error;
  }
};

// Get order by ID
export const getOrderById = async (orderId) => {
  try {
    const response = await axios.get(`${API_URL}/orders/${orderId}`, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error(`Error al obtener pedido ${orderId}:`, error);
    throw error;
  }
};

// Calculate discounts
export const calculateDiscounts = async (subtotal) => {
  try {
    const response = await axios.get(`${API_URL}/orders/calculate-discounts?subtotal=${subtotal}`, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('Error al calcular descuentos:', error);
    throw error;
  }
};
