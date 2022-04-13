import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../pages/Home.vue'
import Protected from '../pages/Protected.vue'

const routes: RouteRecordRaw[] = [
    { path: '/', component: Home, meta: { public: true } },
    { path: '/protected', component: Protected }
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router