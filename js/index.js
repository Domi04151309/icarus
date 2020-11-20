import Training from './pages/training.js'
import Plan from './pages/plan.js'
import Account from './pages/account.js'
import Preferences from './pages/preferences.js'

Vue.config.devtools = location.hostname === 'localhost' || location.hostname === '127.0.0.1'

const routes = [
  { path: '/', redirect: '/training' },
  { path: '/training', component: Training },
  { path: '/plan', component: Plan },
  { path: '/account', component: Account },
  { path: '/preferences', component: Preferences }
]

const router = new VueRouter({routes})

const v = new Vue({
  router,
  el: '#app'
})
