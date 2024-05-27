import axios from 'axios';

const API_URL = 'http://localhost:3000/user'; // sau IP-ul serverului tău

export const loginUser = async (email: any, password: any) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      userData: { email, password },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const registerUser = async (firstName: any, lastName: any, email: any, password: any) => {
  try {
    const response = await axios.post(`${API_URL}/createUser`, {
      userData: { firstName, lastName, email, password },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
