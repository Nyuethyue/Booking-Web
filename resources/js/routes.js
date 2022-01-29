import { createRouter, createWebHistory } from "vue-router";

import home from './components/admin/Home.vue';
import dashboard from './components/Dashboard.vue';
import profile from './components/Profile.vue';
import adminuser from './components/admin/Users.vue';
import booking from './components/admin/Booking.vue';
import bookedhistory from './components/admin/BookedHistory.vue';
import bookinghour from './components/admin/BookingHour.vue';

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
    {
        path: '/booking',
        component: booking,
        name: booking
    },

    {
        path: '/bookedhistory',
        component: bookedhistory,
        name: bookedhistory
    },
    {
        path: '/bookinghour',
        component: bookinghour,
        name: bookinghour
    },
];

export default createRouter({
    history: createWebHistory(),
    routes
})