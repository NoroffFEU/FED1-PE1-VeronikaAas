import { remove } from "../storage/index.mjs";

document.addEventListener('DOMContentLoaded', () => {
    const logoutLink = document.getElementById('logoutLink');

    if (logoutLink) {
        logoutLink.addEventListener('click', (event) => {
            event.preventDefault(); 
            logout(); 
            window.location.href = '/posts/index.html'; 
        });
    }
});

export function logout() {
    remove("account");
    remove("token");
}

logout();