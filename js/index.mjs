import * as listeners from "./handlers/index.mjs";
import { getPosts } from "../js/post/read.mjs";
import { checkLogin } from "./auth/checkLogin.mjs";

listeners.setLoginFormListener();
listeners.setCreatePostListener();
listeners.setRegisterFormListener();
listeners.setUpdatePostListener();
getPosts();

const isLoggedIn = checkLogin();
if (isLoggedIn) {
  const adminLink = document.getElementById("adminLink");
  if (adminLink) {
    adminLink.innerHTML = `<a href="/post/adminFeed.html">Adminfeed</a>`;
  }
}


