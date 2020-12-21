/*global Vue, VueRouter*/

const SetupWelcome = () => import('./pages/setup/1-welcome.js')
const SetupInfo = () => import('./pages/setup/2-info.js')
const SetupNutrition = () => import('./pages/setup/3-nutrition.js')
const SetupFitness = () => import('./pages/setup/4-fitness.js')
const SetupFinish = () => import('./pages/setup/5-finish.js')

const Progress = () => import('./pages/main/progress.js')
const Exercises = () => import('./pages/main/exercises.js')
const Experience = () => import('./pages/main/experience.js')
const Account = () => import('./pages/main/account.js')

const Day = () => import('./pages/day.js')
const Week = () => import('./pages/week.js')
const Month = () => import('./pages/month.js')
const Calendar = () => import('./pages/calendar.js')

const Food = () => import('./pages/food.js')

const AddFood = () => import('./pages/add-food.js')

const NewExercise = () => import('./pages/new-exercise.js')

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
  { path: '/exercises/new-exercise', component: NewExercise },
  { path: '/experience', component: Experience },
  { path: '/experience/healthy', component: Food, props: { healthy: true } },
  { path: '/experience/not-so-healthy', component: Food, props: { healthy: false } },
  { path: '/experience/healthy/add-food', component: AddFood, props: { healthy: true } },
  { path: '/experience/not-so-healthy/add-food', component: AddFood, props: { healthy: false } },
  { path: '/account', component: Account },
  { path: '/account/preferences', component: Preferences },
  { path: '/account/data', component: Data },
  { path: '/account/help', component: Help },
  { path: '/account/about', component: About }
]

var modal
const router = new VueRouter({ routes })

window.backButtonPress = false
window.addEventListener('popstate', () => {
  window.backButtonPress = true
})

router.beforeEach((to, from, next) => {
  modal = document.querySelector('.modal-container')
  if (modal != null) {
    modal.parentNode.removeChild(modal)
    next(false)
  }
  else if (window.backButtonPress) {
    window.backButtonPress = false
    if (
      from.path == '/progress'
      || from.path == '/exercises'
      || from.path == '/experience'
      || from.path == '/account'
    ) next(false)
    else if (
      from.path.includes('progress')
      || from.path.includes('exercises')
      || from.path.includes('experience')
      || from.path.includes('account')
    ) next(from.path.substring(0, from.path.lastIndexOf('/')))
    else next()
  }
  else next()
})

new Vue({
  router,
  el: '#app',
  mounted() {
    const loadingScreen = document.getElementById('loading_screen')
    var headers, i

    loadingScreen.parentNode.removeChild(loadingScreen)

    if (
      !localStorage.getItem('setup_complete')
      && !this.$route.path.includes('setup')
      && !navigator.userAgent.includes('Chrome-Lighthouse')
    ) this.$router.push('/setup/welcome')

    document.addEventListener('scroll', () => {
      headers = document.getElementsByTagName('HEADER')
      for (i = 0; i < headers.length; i++) {
        headers[i].classList.toggle('header-shadow', window.pageYOffset > 0)
      }
    })
  }
})
