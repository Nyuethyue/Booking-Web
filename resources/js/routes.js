import { createRouter, createWebHistory } from "vue-router";

import dashboard from './components/Dashboard.vue';
import profile from './components/Profile.vue'

const routes = [
    {
        path: '/dashboard',
        component: dashboard,
        name: dashboard
    },

    {
        path: '/profile',
        component: profile,
        name: profile
    },
];

export default createRouter({
    history: createWebHistory(),
    routes
})