import { remove } from "../storage/index.mjs";


export function logout() {
    remove("account");
    remove("token");
}