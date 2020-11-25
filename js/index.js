import SetupWelcome from './pages/setup-1-welcome.js'
import SetupInfo from './pages/setup-2-info.js'
import SetupFinish from './pages/setup-3-finish.js'

import Progress from './pages/progress.js'
import Plan from './pages/plan.js'
import Account from './pages/account.js'

import Today from './pages/today.js'
import Week from './pages/week.js'
import Month from './pages/month.js'

import Preferences from './pages/preferences.js'
import Help from './pages/help.js'
import About from './pages/about.js'

Vue.config.devtools = location.hostname === 'localhost' || location.hostname === '127.0.0.1'

const routes = [
  { path: '/', redirect: '/progress' },
  { path: '/setup/welcome', component: SetupWelcome },
  { path: '/setup/info', component: SetupInfo },
  { path: '/setup/finish', component: SetupFinish },
  { path: '/progress', component: Progress },
  { path: '/progress/today', component: Today },
  { path: '/progress/week', component: Week },
  { path: '/progress/month', component: Month },
  { path: '/plan', component: Plan },
  { path: '/account', component: Account },
  { path: '/preferences', component: Preferences },
  { path: '/help', component: Help },
  { path: '/about', component: About }
]

const router = new VueRouter({ routes })

const v = new Vue({
  router,
  el: '#app',
  mounted: function () {
    const loadingScreen = document.getElementById('loading_screen');
    loadingScreen.parentNode.removeChild(loadingScreen);

    if (!localStorage.getItem('setup_complete') && !this.$route.fullPath.includes('setup')) {
      this.$router.push('/setup/welcome')
    }

    const header = document.getElementsByTagName('HEADER')
    var i

    document.addEventListener('scroll', function () {
      for (i = 0; i < header.length; i++) {
        header[i].classList.toggle('header-shadow', window.pageYOffset > 0)
      }
    }.bind(this))
  }
})
