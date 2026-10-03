import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,

  // Tells Axios to send keys cleanly without adding '[]'
  paramsSerializer: (params) => {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => searchParams.append(key, val));
      } else if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value);
      }
    });

    return searchParams.toString();
  }
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if the error status is 429 (Too Many Requests)
    if (error.response && error.response.status === 429) {
      const message =
        error.response.data?.message ||
        'Too many attempts! Please wait a moment before trying again.';

      // Trigger global toast
      toast.error(message, {
        id: 'rate-limit-toast', // Prevents duplicate toasts from stacking
        duration: 5000,
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;