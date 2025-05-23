import { ApiResponse } from "@/types";

let allData: ApiResponse | null = null;

export const fetchData = async (): Promise<ApiResponse | null> => {
  if (allData) return allData;

  try {
    const res = await fetch('/api/data');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    
    const data: ApiResponse = await res.json();
    allData = data;
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const fetchDataServer = async (): Promise<ApiResponse | null> => {
  try {
    const apiUrl = process.env.API_URL_WITH_PARAMS;
    if (!apiUrl) throw new Error('API_URL_WITH_PARAMS not configured');

    const res = await fetch(apiUrl, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching server data:', error);
    return null;
  }
};