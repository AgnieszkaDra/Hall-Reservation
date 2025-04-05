import { fetchData } from "./fetchData";

export const fetchCommunions = async () => {
    try {
        const organizers = await fetchData('organizers');

        const groupsSet = new Set<string>();
        organizers.forEach((organizer: { communions: { group: string[] }[] }) => {
            organizer.communions.forEach((communion) => {
                communion.group.forEach((group) => groupsSet.add(group));
            });
        });

        return Array.from(groupsSet).map((group) => ({
            value: group,
            label: group
        }));
    } catch (error) {
        console.error("Error fetching communions:", error);
        return [];
    }
};