require('./bootstrap');

window.Vue = require('vue').default;
import moment from 'moment';
import Vue from 'vue';
import router from './routes';

import Swal from 'sweetalert2';
window.Swal = Swal;

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

window.Toast = Toast;


Vue.component('pagination', require('laravel-vue-pagination'));

import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '3px'
  })


Vue.filter('upText', function(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
})

window.Fire = new Vue();

const app = new Vue({
    el: '#app',
    router
})

// Vue.component('landing', require('./components/frontend/Landing').default)
// const book = new Vue({
//   el: '#book',
//   router
// })