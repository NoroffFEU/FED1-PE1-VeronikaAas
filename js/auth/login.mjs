import { API_BASE_URL } from "../constants.mjs";
import * as storage from "../storage/index.mjs";

const action = "/auth/login";
const method = "post";

export async function login(profile)  {
    const loginURL = API_BASE_URL + action;
    const body = JSON.stringify(profile);

    const response = await fetch(loginURL, {
        headers: {
            "Content-type": "application/json"
        },
        method,
        body
    })

    const result = await response.json();

    const { accessToken, ...account} = result.data;
    storage.save("token", accessToken);
    storage.save("account", account);
    console.log(accessToken);

    alert("Your are now logged in");

    location.reload();
}
