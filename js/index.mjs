import  * as API from "./constants.mjs";
import * as router from "./router.mjs";
import * as listeners from "./handlers/index.mjs";
import * as storage from "./storage/index.mjs";
import * as key from "./api/authFetch.mjs"

storage();
router();
API();
listeners();
key();