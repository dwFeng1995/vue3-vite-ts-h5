import {createRouter,createWebHashHistory} from "vue-router";
import {constantroute} from "./routes"

const router = createRouter({
    history:createWebHashHistory(),
    routes:constantroute
})

export default router