import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Get auth token for API requests
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Get cart items
export const getCartItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/cart`, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener items del carrito:', error);
    throw error;
  }
};

// Add item to cart
export const addToCart = async (productId, productName, price, quantity = 1, productImage = '') => {
  try {
    const response = await axios.post(`${API_URL}/cart/add`, {
      productId,
      productName,
      price,
      quantity,
      productImage
    }, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('Error al agregar item al carrito:', error);
    throw error;
  }
};

// Update item quantity
export const updateCartItemQuantity = async (productId, quantity) => {
  try {
    const response = await axios.put(`${API_URL}/cart/update`, {
      productId,
      quantity
    }, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar cantidad del item:', error);
    throw error;
  }
};

// Remove item from cart
export const removeFromCart = async (productId) => {
  try {
    await axios.delete(`${API_URL}/cart/remove/${productId}`, {
      headers: getAuthHeaders()
    });
  } catch (error) {
    console.error('Error al eliminar item del carrito:', error);
    throw error;
  }
};

// Clear cart
export const clearCart = async () => {
  try {
    await axios.delete(`${API_URL}/cart/clear`, {
      headers: getAuthHeaders()
    });
  } catch (error) {
    console.error('Error al vaciar el carrito:', error);
    throw error;
  }
};

// Check if cart is empty
export const isCartEmpty = async () => {
  try {
    const response = await axios.get(`${API_URL}/cart/empty`, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('Error al verificar si el carrito está vacío:', error);
    throw error;
  }
};
