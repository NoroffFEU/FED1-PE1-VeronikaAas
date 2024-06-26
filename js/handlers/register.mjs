import { register } from "../auth/register.mjs";

export function setRegisterFormListener () {
    const form = document.querySelector("#registerForm");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault()
    
            const form = event.target;
            const formData = new FormData(form);
            const profile = Object.fromEntries(formData.entries())
    
            register(profile)
            alert("You are now registered");
            window.location.href = `/FED1-PE1-VeronikaAas/account/login.html`
        });
    }
}
setRegisterFormListener(); 