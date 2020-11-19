import AppBar from './components/app-bar.js'
import TabBar from './components/tab-bar.js'

import Training from './pages/training.js'
import Plan from './pages/plan.js'
import Account from './pages/account.js'

Vue.config.devtools = location.hostname === 'localhost' || location.hostname === '127.0.0.1'

const routes = [
  { path: '/', redirect: '/training' },
  { path: '/training', component: Training },
  { path: '/plan', component: Plan },
  { path: '/account', component: Account }
]

const router = new VueRouter({routes})

const v = new Vue({
  router,
  el: '#app',
  data: {
    title: 'Icarus',
    mainActivity: {
      tabs: [
        {
          icon: "directions_run",
          title: "Training",
          url: "/training"
        },
        {
          icon: "view_list",
          title: "Plan",
          url: "/plan"
        },
        {
          icon: "account_circle",
          title: "Account",
          url: "/account"
        }
      ]
    }
  },
  components: {
    AppBar,
    TabBar
  }
})
