import { LoginFormData, SignupFormData } from '../validations/auth.schema';
import axios from './api';

// Define the user data type for registration and login


// Function to register a new user
export const register = async (userData: SignupFormData): Promise<any> => {
    try {
        const response = await axios.post('/auth/register', {
            ...userData,
            role: 'ROLE_USER',
        });
        return response.data;
    } catch (error: any) {
        console.error('Error during registration:', error.message);
        throw error.response?.data?.message || 'Registration failed';
    }
};

// Function to log in a user
export const login = async (userData: LoginFormData): Promise<any> => {
    try {
        const response = await axios.post('/auth/login', userData);
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.message || 'Login failed';
    }
};

// Function to retrieve the JWT token from local storage
export const getToken = (): string | null => {
    return localStorage.getItem('token');
};

// Function to remove the JWT token from local storage
export const removeToken = (): void => {
    localStorage.removeItem('token');
};
