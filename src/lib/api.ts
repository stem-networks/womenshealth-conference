import { ApiResponse } from "@/types";

let allData: ApiResponse | null = null;

export const fetchData = async (): Promise<ApiResponse | null> => {
  if (allData) return allData;

  try {
    const res = await fetch("/api/general");
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data: ApiResponse = await res.json();
    allData = data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// If still needed for SSR use, it should call a local API route instead

export const fetchIndexPageData = async () => {
  try {
    const response = await fetch("/api/index-page", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching index page data:", error);
    return null;
  }
};

export const fetchCommonContent = async () => {
  try {
    const response = await fetch("/api/common-content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching common content:", error);
    return null;
  }
};

export const fetchDiscounts = async () => {
  try {
    const response = await fetch("/api/pricing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const { increment_price } = data;

    const sortedData = Object.keys(increment_price).map((type) => ({
      type,
      total: parseInt(increment_price[type].total, 10) || 0,
    }));

    const presenterData = sortedData.find(
      (item) => item.type === "Presenter (In-Person)"
    );
    return presenterData?.total || 0;
  } catch (error) {
    console.error("Error fetching discount data:", error);
    return 0;
  }
};
