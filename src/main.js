import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io';
import 'bootstrap/dist/css/bootstrap.css';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/black-green-dark.css';
import VueMaterial from 'vue-material'

Vue.use(new VueSocketIO({
  connection: 'http://localhost:5000',
}))

Vue.use(VueMaterial)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
