const API_BASE = 'http://localhost:8080';

export const api = {
  async login(email, password) {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Login failed');
    }
    
    return response.json();
  },

  async register(userData) {
    const response = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Registration failed');
    }
    
    return response.json();
  },

  async validateToken(token) {
    const response = await fetch(`${API_BASE}/api/auth/validate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      return { valid: false };
    }
    
    return response.json();
  },

  async getProducts() {
    const response = await fetch(`${API_BASE}/api/v1/products`);
    return response.json();
  },

  async getProduct(id) {
    const response = await fetch(`${API_BASE}/api/v1/products/${id}`);
    return response.json();
  },

  async createProduct(product, token) {
    const response = await fetch(`${API_BASE}/api/v1/products`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    return response.json();
  },

  async updateProduct(id, product, token) {
    const response = await fetch(`${API_BASE}/api/v1/products/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    return response.json();
  },

  async deleteProduct(id, token) {
    const response = await fetch(`${API_BASE}/api/v1/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response;
  },
};
