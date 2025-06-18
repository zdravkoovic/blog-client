import axios from "@/components/axios";

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export async function getCategoryList() {
  try {
    const response = await axios.get('/api/v1/categories');
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }
    const data = await response.data.data;
    return data;
  } catch (error) {
    console.error('Error fetching category list:', error);
    throw error;
  }
}