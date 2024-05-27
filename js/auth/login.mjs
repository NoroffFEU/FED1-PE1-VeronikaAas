import { API_BASE_URL } from "../constants.mjs";
import * as storage from "../storage/index.mjs";

const action = "/auth/login";
const method = "post";

export async function login(profile) {
    const loginURL = API_BASE_URL + action;
    const body = JSON.stringify(profile);

    try {
        const response = await fetch(loginURL, {
            headers: {
                "Content-type": "application/json"
            },
            method,
            body
        });

        if (!response.ok) {
            throw new Error('Failed to log in. Please check your credentials and try again.');
        }

        const result = await response.json();

        const { accessToken, ...account } = result.data;
        storage.save("token", accessToken);
        storage.save("account", account);

        alert("You are now logged in");

        window.location.href = '/post/index.html'; 

    } catch (error) {
        console.error('Error logging in:', error);
        alert(error.message); 
    }
}