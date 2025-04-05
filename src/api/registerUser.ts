import { BACK_END_URL } from "../constants/api";
import { User } from "../types/User";

export async function registerUser(body: any): Promise<User> {
    const url = `${BACK_END_URL}/users`;

    const user = { ...body, lastLogin: new Date().toISOString() };

    try {
        const resp = await fetch(url, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (!resp.ok) throw new Error(`Error: ${resp.status}`);

        const createdUser: User = await resp.json();
        
        return createdUser;

    } catch (err) {
        console.error("Registration Error:", err);
        throw err; 
    }
}

export default registerUser;