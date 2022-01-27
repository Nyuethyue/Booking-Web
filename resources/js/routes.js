import { createRouter, createWebHistory } from "vue-router";

import home from './components/admin/Home.vue';
import dashboard from './components/Dashboard.vue';
import profile from './components/Profile.vue';
import adminuser from './components/admin/Users.vue';

const routes = [
    {
        path: '/home',
        component: home,
        name: home
    },

    {
        path: '/dashboard',
        component: dashboard,
        name: dashboard
    },

    {
        path: '/adminuser',
        component: adminuser,
        name: adminuser
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