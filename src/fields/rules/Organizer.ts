import { fetchData } from "../../api/fetchData";

type Resource = "organizers" | "users" ;
type Key = "email" | "name";

interface Entity {
  [key: string]: string;
}

// export async function checkIfExists(resource: Resource, key: Key, value: string): Promise<Entity | null> {
//   try {
//     const data: Entity[] = await fetchData(resource);
//     const found = data.find((item) => item[key] === value.trim());
//     return found || null;
//   } catch (error) {
//     console.error(`Error checking if ${key} exists in ${resource}:`, error);
//     return null;
//   }
// }

export async function checkIfExists<T extends Record<string, any>>(
    resource: Resource,
    key: Key,
    value: string
  ): Promise<T | null> {
    try {
      const data: T[] = await fetchData(resource);
      const found = data.find((item) => item[key] === value.trim());
      return found || null;
    } catch (error) {
      console.error(`Error checking if ${key} exists in ${resource}:`, error);
      return null;
    }
  }