import * as listeners from "./handlers/index.mjs";
import { getPosts } from "../js/post/read.mjs";
//import { logout } from "./handlers/logout.mjs";

listeners.setLoginFormListener();
listeners.setCreatePostListener();
listeners.setRegisterFormListener();
listeners.setUpdatePostListener();
//logout();
getPosts();




