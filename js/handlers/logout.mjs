import { remove } from "../storage/index.mjs";

document.addEventListener('DOMContentLoaded', () => {
    const logoutLink = document.getElementById('logoutLink');

    if (logoutLink) {
        logoutLink.addEventListener('click', (event) => {
            event.preventDefault(); 
            logout(); 
            window.location.href = '/FED1-PE1-VeronikaAas/index.html'; 
        });
    }
});

export function logout() {
    remove("account");
    remove("token");
}

