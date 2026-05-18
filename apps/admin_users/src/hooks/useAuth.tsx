// hooks/useAuth.ts
import { useState } from 'react';
import api from '../services/api';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
    role?: string;
    group?: string;
    sector?: string;
  };
  logError?: boolean;
  error?: string;
  status?: number;
}

export const useAuth = () => {
  // Recuperar token do localStorage
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('@UnimedOuvidoria:token');
  });

  // 🔧 ADICIONAR ISSO - Recuperar user do localStorage
  const [user, setUser] = useState<any>(() => {
    const userStored = localStorage.getItem('@UnimedOuvidoria:user');
    if (userStored) {
      try {
        return JSON.parse(userStored);
      } catch (error) {
        console.error('Erro ao parsear user:', error);
        return null;
      }
    }
    return null;
  });

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await api.post('/session', { email, password });
      
      console.log('Resposta do login:', response.data); // Debug
      
      if (response.data.token) {
        const { token, user } = response.data;
        
        // Salvar no localStorage
        localStorage.setItem('@UnimedOuvidoria:token', token);
        localStorage.setItem('@UnimedOuvidoria:user', JSON.stringify(user));
        
        // Atualizar estados
        setToken(token);
        setUser(user); // 🔧 ADICIONAR ISSO
        
        // Configurar token no axios
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        console.log('Usuário salvo:', user); // Debug
        
        return response.data;
      } else if (response.data.logError) {
        throw new Error(response.data.error || 'Erro ao fazer login');
      }
      
      return response.data;
    } catch (error: any) {
      console.log('Erro no login:', error.response);
      if (error.response?.data?.error) {
        throw new Error(error.response.data);
      }
      throw new Error(error.response?.data || 'Erro ao fazer login');
    }
  };

  const logout = () => {
    localStorage.removeItem('@UnimedOuvidoria:token');
    localStorage.removeItem('@UnimedOuvidoria:user');
    setToken(null);
    setUser(null); // 🔧 ADICIONAR ISSO
    delete api.defaults.headers.common['Authorization'];
  };

  const isAuthenticated = !!token;

  return {
    login,
    logout,
    isAuthenticated,
    token,
    user, // 🔧 ADICIONAR ISSO - Retornar o user
  };
};