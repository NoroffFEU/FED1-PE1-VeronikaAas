import * as listeners from "./handlers/index.mjs"
import * as postMethods from "./post/index.mjs";
import * as templates from "../templates/index.mjs";

const path = location.pathname;

if (path === '/profile/login/') {
    listeners.setLoginFormListener()
} else if (path === '/profile/register/') {
    listeners.setRegisterFormListener()
} else if (path === '/post/create/') {
    listeners.setCreatePostListener()
} else if (path === '/post/edit/') {
    listeners.setUpdatePostListener()
}

async function testTemplate() {
    const posts = await postMenthods.getPosts();
    const container = document.querySelector("#posts");
    templates.renderPostTemplates(posts, container);
}