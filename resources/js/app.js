require('./bootstrap');

import { createApp } from 'vue';
import moment from 'moment';
import router from './routes';

import Home from './components/admin/Home.vue';

// createApp({
//     components: {
//         Home
//     }
// }).use(router).mount('#app')

const app = createApp({
    components: Home
})

// Global Filters for moment
app.config.globalProperties.$filters = {
    myDate(created) {
        return moment(created).format("MMM Do YY");
    }
}

// Global Filters for Sting to uppercase
// app.config.globalProperties.$filters = {
//     upText(text) {
//       return text.toUpperCase();
//     }
// }


app.use(router)
app.mount('#app')






// Global Filters
// .config.globalProperties.$filters = {
//     upText(text) {
//       return text.toUpperCase();
//     }
//   }

// to do later

// moment
