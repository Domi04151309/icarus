/*global Vue, VueRouter*/

const SetupWelcome = () => import('./pages/setup-1-welcome.js')
const SetupInfo = () => import('./pages/setup-2-info.js')
const SetupNutrition = () => import('./pages/setup-3-nutrition.js')
const SetupFitness = () => import('./pages/setup-4-fitness.js')
const SetupFinish = () => import('./pages/setup-5-finish.js')

const Progress = () => import('./pages/progress.js')
const Exercises = () => import('./pages/exercises.js')
const Experience = () => import('./pages/experience.js')
const Account = () => import('./pages/account.js')

const Day = () => import('./pages/day.js')
const Week = () => import('./pages/week.js')
const Month = () => import('./pages/month.js')
const Calendar = () => import('./pages/calendar.js')

const Healthy = () => import('./pages/healthy.js')
const NotSoHealthy = () => import('./pages/not-so-healthy.js')

const AddFood = () => import('./pages/add-food.js')

const Preferences = () => import('./pages/preferences.js')
const Data = () => import('./pages/data.js')
const Help = () => import('./pages/help.js')
const About = () => import('./pages/about.js')

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
  { path: '/experience/add-food', component: AddFood },
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
