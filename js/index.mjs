import * as listeners from "./handlers/index.mjs";
import { getPosts } from "../js/post/read.mjs";
import { renderPosts } from "../templates/post.mjs";

listeners.setLoginFormListener();
listeners.setCreatePostListener();
listeners.setRegisterFormListener();
listeners.setUpdatePostListener();
getPosts();
renderPosts();

