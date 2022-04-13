import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../pages/Home.vue'

const routes: RouteRecordRaw[] = [
    { path: '/', component: Home, meta: { public: true } },
    { path: '/parameters', component: () => import('../pages/Parameters.vue') },
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router