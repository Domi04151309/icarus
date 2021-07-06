/*global Vue, VueRouter*/

import JsonHelper from './helpers/json.js'

const Unknown = () => import('./pages/unknown.js')

const SetupVerification = () => import('./pages/setup/0-verification.js')
const SetupWelcome = () => import('./pages/setup/1-welcome.js')
const SetupInfo = () => import('./pages/setup/2-info.js')
const SetupWellBeing = () => import('./pages/setup/3-well-being.js')
const SetupNutrition = () => import('./pages/setup/4-nutrition.js')
const SetupFitness = () => import('./pages/setup/5-fitness.js')
const SetupFinish = () => import('./pages/setup/6-finish.js')

const Progress = () => import('./pages/main/progress.js')
const WellBeing = () => import('./pages/main/well-being.js')
const Exercises = () => import('./pages/main/exercises.js')
const Nutrition = () => import('./pages/main/nutrition.js')
const Account = () => import('./pages/main/account.js')

const Day = () => import('./pages/day.js')
const DayLite = () => import('./pages/day-lite.js')
const Week = () => import('./pages/week.js')
const Month = () => import('./pages/month.js')
const Calendar = () => import('./pages/calendar.js')
const Tracking = () => import('./pages/tracking.js')
const TrackingAdd = () => import('./pages/tracking-add.js')
const Diary = () => import('./pages/diary.js')
const DiaryEntry = () => import('./pages/diary-entry.js')

const Sleep = () => import('./pages/sleep.js')
const Meditation = () => import('./pages/meditation.js')

const FoodRecommendations = () => import('./pages/food-recommendations.js')

const Food = () => import('./pages/food.js')
const FoodDetails = () => import('./pages/food-details.js')
const FoodItem = () => import('./pages/food-item.js')
const FoodUpdate = () => import('./pages/food-update.js')

const ExerciseList = () => import('./pages/exercise-list.js')
const ExerciseDetails = () => import('./pages/exercise-details.js')
const WorkoutDetails = () => import('./pages/workout-details.js')

const AppSettings = () => import('./pages/app-settings.js')
const ErrorLog = () => import('./pages/log.js')
const DataSettings = () => import('./pages/data-settings.js')
const NutritionPlan = () => import('./pages/nutrition-plan.js')
const WorkoutPlan = () => import('./pages/workout-plan.js')
const BackupAndRestore = () => import('./pages/backup-and-restore.js')
const Help = () => import('./pages/help.js')
const About = () => import('./pages/about.js')

const Tools = () => import('../tools/tools.js')
const Data = () => import('../tools/data.js')
const Encryptor = () => import('../tools/encryptor.js')
const ExtractorExercises = () => import('../tools/extractor-exercises.js')
const ExtractorFood = () => import('../tools/extractor-food.js')
const ExtractorWorkouts = () => import('../tools/extractor-workouts.js')
const ImageViewer = () => import('../tools/image-viewer.js')

Vue.config.devtools = location.hostname == 'localhost'

window.unlocked = !localStorage.getItem('liteMode')

const routes = [
  { path: '/', redirect: '/progress' },
  { path: '*', component: Unknown },
  { path: '/setup/verification', component: SetupVerification },
  { path: '/setup/welcome', component: SetupWelcome },
  { path: '/setup/info', component: SetupInfo },
  { path: '/setup/well-being', component: SetupWellBeing },
  { path: '/setup/nutrition', component: SetupNutrition },
  { path: '/setup/fitness', component: SetupFitness },
  { path: '/setup/finish', component: SetupFinish },
  { path: '/progress', component: Progress },
  { path: '/progress/week', component: Week },
  { path: '/progress/month', component: Month },
  { path: '/progress/calendar', component: Calendar },
  { path: '/progress/tracking', component: Tracking },
  { path: '/progress/tracking/add', component: TrackingAdd },
  { path: '/progress/diary', component: Diary },
  { path: '/progress/diary/entry', component: DiaryEntry },
  { path: '/well-being', component: WellBeing },
  { path: '/well-being/sleep', component: Sleep },
  { path: '/well-being/meditation', component: Meditation },
  { path: '/exercises', component: Exercises },
  { path: '/exercises/list', component: ExerciseList },
  { path: '/exercises/details', component: ExerciseDetails },
  { path: '/exercises/workout-details', component: WorkoutDetails },
  { path: '/nutrition', component: Nutrition },
  { path: '/nutrition/recommendations', component: FoodRecommendations },
  { path: '/nutrition/healthy', component: Food, props: { healthy: true } },
  { path: '/nutrition/casual', component: Food, props: { healthy: false } },
  { path: '/nutrition/healthy/details', component: FoodDetails, props: { healthy: true } },
  { path: '/nutrition/casual/details', component: FoodDetails, props: { healthy: false } },
  { path: '/nutrition/healthy/item', component: FoodItem, props: { healthy: true } },
  { path: '/nutrition/casual/item', component: FoodItem, props: { healthy: false } },
  { path: '/nutrition/update', component: FoodUpdate },
  { path: '/account', component: Account },
  { path: '/account/app', component: AppSettings },
  { path: '/account/app/log', component: ErrorLog },
  { path: '/account/data', component: DataSettings },
  { path: '/account/data/nutrition', component: NutritionPlan },
  { path: '/account/data/workout', component: WorkoutPlan },
  { path: '/account/data/raw', component: Data },
  { path: '/account/backup-and-restore', component: BackupAndRestore },
  { path: '/account/help', component: Help },
  { path: '/account/about', component: About },

  { path: '/tools', component: Tools },
  { path: '/tools/data', component: Data },
  { path: '/tools/encryptor', component: Encryptor },
  { path: '/tools/extractor-exercises', component: ExtractorExercises },
  { path: '/tools/extractor-food', component: ExtractorFood },
  { path: '/tools/extractor-workouts', component: ExtractorWorkouts },
  { path: '/tools/image-viewer', component: ImageViewer }
]

if (window.unlocked) routes.push({ path: '/progress/day', component: Day })
else routes.push({ path: '/progress/day', component: DayLite })

function logError(e) {
  const errors = JsonHelper.get('errors', () => [])
  errors.push(e.message + ' at ' + e.filename?.replace(/.*\/\/[^/]*/, '') + ':' + e.lineno)
  JsonHelper.set('errors', errors)
}
window.addEventListener('error', e => {
  logError(e)
})
Vue.config.errorHandler = e => {
  console.error(e)
  logError(e)
}

var headers, i
document.addEventListener('scroll', () => {
  headers = document.getElementsByTagName('HEADER')
  for (i = 0; i < headers.length; i++) {
    headers[i].classList.toggle('header-shadow', window.pageYOffset > 0)
  }
})

var modal
const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

window.backButtonPress = false
window.addEventListener('popstate', () => {
  window.backButtonPress = true
})

window.encrypt = async input => {
  return Array.from(
    new Uint8Array(
      await crypto.subtle.digest('SHA-256',new TextEncoder().encode(input))
    )
  ).map(b => b.toString(16).padStart(2, '0')).join('')
}
window.checkHostname = async () => {
  const hostname = await window.encrypt(location.hostname)
  return hostname == '49960de5880e8c687434170f6476605b8fe4aeb9a28632c7995cf3ba831d9763'
    || hostname == '61f46ecc76756e9e83de8c18b7ead29f2afdb64e512aacd5ad3a11daee79992a'
}
window.checkVerification = async code => {
  return await window.encrypt(code) == '6bed48070d152496ee432522d738fa1fbf5e933a52f6ddbe2cf56a55aaace01d'
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
      || from.path == '/well-being'
      || from.path == '/nutrition'
      || from.path == '/exercises'
      || from.path == '/account'
    ) next(false)
    else if (
      (from.path.includes('progress')
      || from.path.includes('well-being')
      || from.path.includes('nutrition')
      || from.path.includes('exercises')
      || from.path.includes('account'))
      && !from.path.includes('setup')
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
      if (!localStorage.getItem('liteMode') && !location.hash.includes('setup') && !navigator.userAgent.includes('Chrome-Lighthouse')) {
        if (!(await window.checkVerification(localStorage.getItem('verification')))) this.$router.push('/setup/verification')
        else if (!localStorage.getItem('setup_complete')) this.$router.push('/setup/welcome')
      }
    }
  },
  mounted() {
    const loadingScreen = document.getElementById('loading_screen')
    window.checkHostname().then(result => {
      if (result) loadingScreen.parentNode.removeChild(loadingScreen)
    })

    let darkTheme = null
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
