/*global Vue, VueRouter*/

import JsonHelper from './helpers/json.js'

const SetupVerification = () => import('./pages/setup/0-verification.js')
const SetupWelcome = () => import('./pages/setup/1-welcome.js')
const SetupInfo = () => import('./pages/setup/2-info.js')
const SetupNutrition = () => import('./pages/setup/3-nutrition.js')
const SetupFitness = () => import('./pages/setup/4-fitness.js')
const SetupFinish = () => import('./pages/setup/5-finish.js')

const Progress = () => import('./pages/main/progress.js')
const Exercises = () => import('./pages/main/exercises.js')
const Nutrition = () => import('./pages/main/nutrition.js')
const Account = () => import('./pages/main/account.js')

const Day = () => import('./pages/day.js')
const Week = () => import('./pages/week.js')
const Month = () => import('./pages/month.js')
const Calendar = () => import('./pages/calendar.js')
const Diary = () => import('./pages/diary.js')

const FoodSuggestions = () => import('./pages/food-suggestions.js')

const Food = () => import('./pages/food.js')

const FoodDetails = () => import('./pages/food-details.js')

const FoodItem = () => import('./pages/food-item.js')

const ExerciseDetails = () => import('./pages/exercise-details.js')
const ExerciseList = () => import('./pages/exercise-list.js')

const AppSettings = () => import('./pages/app-settings.js')
const DataSettings = () => import('./pages/data-settings.js')
const NutritionPlan = () => import('./pages/nutrition-plan.js')
const WorkoutPlan = () => import('./pages/workout-plan.js')
const Data = () => import('./pages/data.js')
const BackupAndRestore = () => import('./pages/backup-and-restore.js')
const Help = () => import('./pages/help.js')
const About = () => import('./pages/about.js')

Vue.config.devtools = location.hostname === 'localhost' || location.hostname === '127.0.0.1'

const routes = [
  { path: '*', redirect: '/progress' },
  { path: '/setup/verification', component: SetupVerification },
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
  { path: '/progress/diary', component: Diary },
  { path: '/exercises', component: Exercises },
  { path: '/exercises/exercise-details', component: ExerciseDetails },
  { path: '/exercises/exercise-list', component: ExerciseList },
  { path: '/nutrition', component: Nutrition },
  { path: '/nutrition/suggestions', component: FoodSuggestions },
  { path: '/nutrition/healthy', component: Food, props: { healthy: true } },
  { path: '/nutrition/casual', component: Food, props: { healthy: false } },
  { path: '/nutrition/healthy/food-details', component: FoodDetails, props: { healthy: true } },
  { path: '/nutrition/casual/food-details', component: FoodDetails, props: { healthy: false } },
  { path: '/nutrition/healthy/food-item', component: FoodItem, props: { healthy: true } },
  { path: '/nutrition/casual/food-item', component: FoodItem, props: { healthy: false } },
  { path: '/account', component: Account },
  { path: '/account/app', component: AppSettings },
  { path: '/account/data', component: DataSettings },
  { path: '/account/data/nutrition', component: NutritionPlan },
  { path: '/account/data/workout', component: WorkoutPlan },
  { path: '/account/data/raw', component: Data },
  { path: '/account/backup-and-restore', component: BackupAndRestore },
  { path: '/account/help', component: Help },
  { path: '/account/about', component: About }
]

window.addEventListener('error', e => {
  var errors = JsonHelper.getData('errors', () => [])
  errors.push(e.message + ' at ' + e.filename.replace(/.*\/\/[^/]*/, '') + ':' + e.lineno)
  localStorage.setItem('errors', JSON.stringify(errors))
})

var headers, i
document.addEventListener('scroll', () => {
  headers = document.getElementsByTagName('HEADER')
  for (i = 0; i < headers.length; i++) {
    headers[i].classList.toggle('header-shadow', window.pageYOffset > 0)
  }
})

var modal
const router = new VueRouter({ routes })

window.backButtonPress = false
window.addEventListener('popstate', () => {
  window.backButtonPress = true
})

window.checkVerification = async code => {
  return Array.from(
    new Uint8Array(
      await crypto.subtle.digest('SHA-256',new TextEncoder().encode(code))
    )
  ).map(
    b => b.toString(16).padStart(2, '0')
  ).join('') == '86a23973ebb571680483f592b7b87325cba446ee35e9dcd4b1459a56964e6835'
}

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
      || from.path == '/nutrition'
      || from.path == '/account'
    ) next(false)
    else if (
      from.path.includes('progress')
      || from.path.includes('exercises')
      || from.path.includes('nutrition')
      || from.path.includes('account')
    ) next(from.path.substring(0, from.path.lastIndexOf('/')))
    else next()
  }
  else next()
})

new Vue({
  router,
  el: '#app',
  methods: {
    async checkStartingRoute() {
      if (
        (!localStorage.getItem('setup_complete')
        || !(await window.checkVerification(localStorage.getItem('verification'))))
        && !this.$route.path.includes('setup')
        && !navigator.userAgent.includes('Chrome-Lighthouse')
      ) this.$router.push('/setup/verification')
    }
  },
  mounted() {
    const loadingScreen = document.getElementById('loading_screen')
    loadingScreen.parentNode.removeChild(loadingScreen)

    var darkTheme = null
    switch (localStorage.getItem('theme') || 'auto') {
      case 'auto':
        darkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        break
      case 'light':
        darkTheme = false
        break
      case 'dark':
        darkTheme = true
        break
    }
    document.documentElement.classList.toggle('dark-theme', darkTheme)

    this.checkStartingRoute()
  }
})
