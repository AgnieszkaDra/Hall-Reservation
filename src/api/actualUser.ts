import { BACK_END_URL } from "../constants/api";
import { User } from "../types/User";

export async function actualUser(user: User): Promise<User> {
    
    const updatedUser = { ...user, lastLogin: new Date().toISOString() };
    
    const response = await fetch(`${BACK_END_URL}/actualUser`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
    });

    if (!response.ok) throw new Error(`Error: ${response.status}`);
    
    return updatedUser; 
}

export default actualUser;
  
