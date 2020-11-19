import AppBar from './components/app-bar.js'
import TabBar from './components/tab-bar.js'

Vue.config.devtools = location.hostname === 'localhost' || location.hostname === '127.0.0.1'
const v = new Vue({
  el: '#app',
  data: {
    title: 'Icarus',
    mainActivity: {
      tabs: [
        {
          icon: "directions_run",
          title: "Training"
        },
        {
          icon: "view_list",
          title: "Plan"
        },
        {
          icon: "account_circle",
          title: "Account"
        }
      ]
    }
  },
  components: {
    AppBar,
    TabBar
  }
})
