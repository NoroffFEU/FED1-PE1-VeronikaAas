import * as listeners from "./handlers/index.mjs";

export default function router() {
    const path = location.pathname;

    switch (path) {
        case '/profile/login/':
            listeners.setLoginFormListener()
            return;
        case '/profile/register/':
            listeners.setRegisterFormListener()
            return;
        case '/post/create/':
            listeners.setCreatePostListener()
            return;
        case '/post/edit/':
            listeners.setUpdatePostFormListener()
            return;
    }
}