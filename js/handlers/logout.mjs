import { remove } from "../storage/index.mjs";

document.addEventListener('DOMContentLoaded', () => {
    const logoutLink = document.getElementById('logoutLink');

    if (logoutLink) {
        logoutLink.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default link behavior
            logout(); // Call the logout function
            window.location.href = '/posts/index.html'; // Redirect to the desired page after logout
        });
    }
});

export function logout() {
    remove("account");
    remove("token");
}

logout();