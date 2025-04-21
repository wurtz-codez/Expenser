import { useState, useCallback } from 'react';
import axios from 'axios';

const useApi = (baseURL = '/api') => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const request = useCallback(async (method, url, data = null, config = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api[method](url, data, config);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api]);

  return {
    loading,
    error,
    get: (url, config) => request('get', url, null, config),
    post: (url, data, config) => request('post', url, data, config),
    put: (url, data, config) => request('put', url, data, config),
    delete: (url, config) => request('delete', url, null, config),
  };
};

export default useApi; 