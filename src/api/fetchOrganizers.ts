export const fetchOrganizers = async () => {
    try {
      const response = await fetch("http://localhost:4000/organizers");
      if (!response.ok) {
        throw new Error("Failed to fetch organizers");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching organizers:", error);
      return [];
    }
  };
  