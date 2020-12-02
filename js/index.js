/*global Vue, VueRouter*/

import SetupWelcome from './pages/setup-1-welcome.js'
import SetupInfo from './pages/setup-2-info.js'
import SetupNutrition from './pages/setup-3-nutrition.js'
import SetupFitness from './pages/setup-4-fitness.js'
import SetupFinish from './pages/setup-5-finish.js'

import Progress from './pages/progress.js'
import Exercises from './pages/exercises.js'
import Experience from './pages/experience.js'
import Account from './pages/account.js'

import Day from './pages/day.js'
import Week from './pages/week.js'
import Month from './pages/month.js'
import Calendar from './pages/calendar.js'

import Healthy from './pages/healthy.js'
import NotSoHealthy from './pages/not-so-healthy.js'

import Preferences from './pages/preferences.js'
import Data from './pages/data.js'
import Help from './pages/help.js'
import About from './pages/about.js'

Vue.config.devtools = location.hostname === 'localhost' || location.hostname === '127.0.0.1'

const routes = [
  { path: '*', redirect: '/progress' },
  { path: '/setup/welcome', component: SetupWelcome },
  { path: '/setup/info', component: SetupInfo },
  { path: '/setup/nutrition', component: SetupNutrition },
  { path: '/setup/fitness', component: SetupFitness },
  { path: '/setup/finish', component: SetupFinish },
  { path: '/progress', component: Progress },
  { path: '/progress/day', component: Day },
  { path: '/progress/week', component: Week },
  { path: '/progress/month', component: Month },
  { path: '/progress/calendar', component: Calendar },
  { path: '/exercises', component: Exercises },
  { path: '/experience', component: Experience },
  { path: '/experience/healthy', component: Healthy },
  { path: '/experience/not-so-healthy', component: NotSoHealthy },
  { path: '/account', component: Account },
  { path: '/preferences', component: Preferences },
  { path: '/data', component: Data },
  { path: '/help', component: Help },
  { path: '/about', component: About }
]

const router = new VueRouter({ routes })

new Vue({
  router,
  el: '#app',
  mounted: function () {
    const loadingScreen = document.getElementById('loading_screen')
    var headers, modal, i

    loadingScreen.parentNode.removeChild(loadingScreen)

    if (!localStorage.getItem('setup_complete') && !this.$route.fullPath.includes('setup') && !navigator.userAgent.includes('Chrome-Lighthouse')) {
      this.$router.push('/setup/welcome')
    }

    document.addEventListener('scroll', () => {
      headers = document.getElementsByTagName('HEADER')
      for (i = 0; i < headers.length; i++) {
        headers[i].classList.toggle('header-shadow', window.pageYOffset > 0)
      }
    })

    window.addEventListener('hashchange', () => {
      modal = document.querySelector('.modal-container')
      if (modal != null) modal.parentNode.removeChild(modal)
    })
  }
})
