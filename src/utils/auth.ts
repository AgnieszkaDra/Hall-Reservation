import actualUser from "../api/actualUser";
import loggedUser from "../api/loggedUser";

export async function getCurrentUser() {
    const userLog = localStorage.getItem("currentUser");
    let userData = userLog ? JSON.parse(userLog) : null;

    if (userData) {
        try {
            userData = await loggedUser(userData);
            return userData;
        } catch (error) {
            console.error("Error fetching logged user:", error);
            return null;
        }
    }

    return null;
}

export async function getActualUser() {
    const userLog = localStorage.getItem("actualUser");
    let userData = userLog ? JSON.parse(userLog) : null;

    if (userData) {
        try {
            userData = await actualUser(userData);
            return userData;
        } catch (error) {
            console.error("Error fetching logged user:", error);
            return null;
        }
    }

    return null;
}