// API Configuration
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL,

  // Throw a clear error if the API URL is missing
  get apiUrl() {
    if (!this.BASE_URL) {
      throw new Error(
        'Missing API URL configuration. Please set VITE_API_BASE_URL or VITE_API_URL in your environment variables.'
      );
    }
    return this.BASE_URL;
  },

  // API endpoints
  ENDPOINTS: {
    LEADS: '/leads',
  },

  // Request timeout in milliseconds
  TIMEOUT: 10000, // 10 seconds
};

export default API_CONFIG;