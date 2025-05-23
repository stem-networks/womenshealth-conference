export async function getAppData() {
  // This could be replaced with a direct database query or API call
  const response = await fetch(`${process.env.INTERNAL_API_URL}/app-data`);
  if (!response.ok) {
    throw new Error('Failed to fetch app data');
  }
  return response.json();
}