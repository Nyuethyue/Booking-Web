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

Vue.component('home', require('./components/admin/Home.vue').default)

const app = new Vue({
    el: '#app',
    router
})