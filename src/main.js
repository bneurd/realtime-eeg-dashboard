import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSocketIO from 'vue-socket.io';
import 'bootstrap/dist/css/bootstrap.css'

Vue.use(new VueSocketIO({
  connection: 'http://localhost:5000',
}))

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
