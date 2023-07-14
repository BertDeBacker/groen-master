import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

// Vue.mixin({
//   data: function() {
//     return {
//       //mt = muurtuin
//       mtColors: {
//         mtHeader: '#5DBCD2',
//         mtBody: '#95D60A'
//       }
//     };
//   },
//   methods: {
//     mtColors2() {
//       return {
//         mtHeader: '#5DBCD2',
//         mtBody: '#95D60A'
//       };
//     }
//   }
// });

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
