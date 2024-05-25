import { logout } from "../extras/logout.mjs";

export function logoutListener(button) {
    button.addEventListener("click", () => {
        logout();
        // Redirect to the login or home page after logout
        window.location.href = '/posts/index.html'; // Replace with your target URL
    });

    document.addEventListener("DOMContentLoaded", () => {
        const logoutButton = document.querySelector("#logoutButton");
        if (logoutButton) {
            logoutListener(logoutButton);
        }
    });
}