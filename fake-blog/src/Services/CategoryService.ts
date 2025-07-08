import axiosSSR from "@/components/auth/axiosSSR";
import axios from "@/components/axios";
import type { Blog } from "./BlogService";

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
    const data = response.data.data;
    return data;
  } catch (error) {
    console.error('Error fetching category list:', error);
    throw error;
  }
}

export async function getSavedBlogs() : Promise<Blog[] | undefined> {
  try {
    const response = await axiosSSR.get('/savedBlogs');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching category list:', error);
    throw error;
  }
}