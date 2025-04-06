import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

// Fetch all jewellery items
export const fetchJewellery = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/jewellery`);
    return response.data;
  } catch (error) {
    console.error("Error fetching jewellery:", error);
    throw error;
  }
};

// You can add more API functions later (e.g., addJewellery, deleteJewellery, etc.)
