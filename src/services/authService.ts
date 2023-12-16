
import api from './api';

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    username: string;
  };
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', { username, password });
    localStorage.setItem('accessToken', response.data.access_token);
    localStorage.setItem('refreshToken', response.data.refresh_token);
    // Optionally store user data as well
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  } catch (error) {
    throw error;
  }
};
  
export const refreshToken = async (): Promise<string> => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) throw new Error('No refresh token available');
  
      const response = await api.post<{ access_token: string }>('/auth/refresh-token', { refresh_token: refreshToken });
      localStorage.setItem('accessToken', response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      throw error;
    }
  };
  
  export const logout = (): void => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    // Optionally remove other user-related data if stored
    localStorage.removeItem('user');
  };
