import Vue from "vue";
import Router from 'vue-router';
Vue.use(Router)

import profile from './components/admin/Profile.vue';
import adminuser from './components/admin/Users.vue';
import booking from './components/admin/Booking.vue';
import bookedhistory from './components/admin/BookedHistory.vue';
import bookinghour from './components/admin/BookingHour.vue';
import booked from './components/admin/Booked.vue';

const routes = [
    {
        path: '/home', component: require('./components/admin/Home.vue')
    },

    {
        path: '/dashboard', component: require('./components/Dashboard.vue')
    },

    {
        path: '/adminuser',
        component: adminuser,
    },

    {
        path: '/profile',
        component: profile,
    },
    {
        path: '/booking',
        component: booking,
    },

    {
        path: '/bookedhistory',
        component: bookedhistory,
    },
    {
        path: '/bookinghour',
        component: bookinghour,
    },
    {
        path: '/booked',
        component: booked,
    },
];

export default new Router({
    mode: 'history',
    routes
})