import { register } from "./register.mjs";

export function setRegisterFormListener () {
    const form = document.querySelector("#registerFrom");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault()
    
            const form = event.target;
            const formData = new FormData(form);
            const profile = Object.fromEntries(formData.entries())
    
            register(profile)
        })
    }
}