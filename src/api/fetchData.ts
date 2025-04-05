type Resource = 'organizers' | 'halls' | 'users';

export const fetchData = async (resource: Resource) => {
  const url = `http://localhost:4000/${resource}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${resource}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${resource}:`, error);
    return [];
  }
};