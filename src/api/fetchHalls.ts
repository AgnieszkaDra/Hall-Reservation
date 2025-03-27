export const fetchHalls = async () => {
    try {
      const response = await fetch("http://localhost:4000/halls");
      if (!response.ok) {
        throw new Error("Failed to fetch halls");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching halls:", error);
      return [];
    }
  };
  