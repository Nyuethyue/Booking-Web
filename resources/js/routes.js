import Vue from "vue";
import Router from 'vue-router';
Vue.use(Router)

import profile from './components/admin/Profile.vue';
import adminuser from './components/admin/Users.vue';
import booking from './components/admin/Booking.vue';
import bookedhistory from './components/admin/BookedHistory.vue';
import bookinghour from './components/admin/BookingHour.vue';
import booked from './components/admin/Booked.vue';
import dashboard from './components/admin/Dashboard.vue';
import home from './components/admin/Dashboard.vue';
import notfound from './components/NotFound.vue';

const routes = [
    {
        path: '/dashboard', component: dashboard,
    },

    {
        path: '/home', component: home,
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
    {path: '*', component: notfound,}
];

export default new Router({
    mode: 'history',
    routes
})