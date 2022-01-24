require('./bootstrap');

import { createApp } from 'vue';
import router from './routes';

import Home from './components/Dashboard.vue';

createApp({
    components: {
        Home
    }
}).use(router).mount('#app')