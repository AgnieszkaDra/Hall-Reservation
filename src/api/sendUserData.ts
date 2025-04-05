import { BACK_END_URL } from "../constants/api";
import { User } from "../types/User";

export async function sendUserData(formData: Record<string, string | number>): Promise<User> {
  const url = `${BACK_END_URL}/users`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return await response.json();
}