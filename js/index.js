import SetupWelcome from './pages/setup-1-welcome.js'
import SetupInfo from './pages/setup-2-info.js'
import SetupFinish from './pages/setup-3-finish.js'

import Progress from './pages/progress.js'
import Exercises from './pages/exercises.js'
import Experience from './pages/experience.js'
import Account from './pages/account.js'

import Today from './pages/today.js'
import Week from './pages/week.js'
import Month from './pages/month.js'
import Calendar from './pages/calendar.js'

import Preferences from './pages/preferences.js'
import Data from './pages/data.js'
import Help from './pages/help.js'
import About from './pages/about.js'

Vue.config.devtools = location.hostname === 'localhost' || location.hostname === '127.0.0.1'

const routes = [
  { path: '*', redirect: '/progress' },
  { path: '/setup/welcome', component: SetupWelcome },
  { path: '/setup/info', component: SetupInfo },
  { path: '/setup/finish', component: SetupFinish },
  { path: '/progress', component: Progress },
  { path: '/progress/today', component: Today },
  { path: '/progress/week', component: Week },
  { path: '/progress/month', component: Month },
  { path: '/progress/calendar', component: Calendar },
  { path: '/exercises', component: Exercises },
  { path: '/experience', component: Experience },
  { path: '/account', component: Account },
  { path: '/preferences', component: Preferences },
  { path: '/data', component: Data },
  { path: '/help', component: Help },
  { path: '/about', component: About }
]

const router = new VueRouter({ routes })

const v = new Vue({
  router,
  el: '#app',
  mounted: function () {
    const loadingScreen = document.getElementById('loading_screen')
    var headers, modal, i

    loadingScreen.parentNode.removeChild(loadingScreen)

    if (!localStorage.getItem('setup_complete') && !this.$route.fullPath.includes('setup') && !navigator.userAgent.includes('Chrome-Lighthouse')) {
      this.$router.push('/setup/welcome')
    }

    document.addEventListener('scroll', function () {
      headers = document.getElementsByTagName('HEADER')
      for (i = 0; i < headers.length; i++) {
        headers[i].classList.toggle('header-shadow', window.pageYOffset > 0)
      }
    }.bind(this))

    window.addEventListener('hashchange', function (event) {
      modal = document.querySelector('.modal-container')
      if (modal != null) modal.parentNode.removeChild(modal)
    }.bind(this))
  }
})
