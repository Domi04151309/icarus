import Page from '../components/page.js'

import ExerciseHelper from '../helpers/exercises.js'
import FoodHelper from '../helpers/food.js'

//TODO: Add content

export default {
  name: 'diary',
  data() {
    return {
      title: 'Diary',
      items: []
    }
  },
  template:
  `<page :title="title" parent="/progress">
    <div v-for="(date, index) in items" :key="index">
      <h2 class="text-center">{{ date.title }}</h2>
      <ul class="card link-list m-0">
        <li v-for="item in date.items" :key="item.time">
          <span v-on:click="share(item, date.title)">
            <div class="flex between center">
              <div>
                {{ item.type }}<br>
                <span class="p">{{ item.details }}</span>
              </div>
              <div class="material-icons-round big-c-icon">{{ item.icon }}</div>
            </div>
          </span>
        </li>
      </ul>
    </div>
  </page>`,
  components: {
      Page
  },
  methods: {
    async share(item, date) {
      const shareData = {
        title: 'Diary Entry',
        text: item.type.replace('You', 'I') + ' at ' + item.details + ' on ' + date + '. Take your personal health to the next level with Icarus.',
        url: 'https://domi04151309.github.io/icarus/'
      }
      console.log(shareData)
      try {
        await navigator.share(shareData)
      } catch (e) {
        console.warn(e)
      }
    }
  },
  created() {
    var items = []
    var food = FoodHelper.getFoodStatistics()
    food.healthy.forEach(item => {
      item.type = 'You ate something healthy'
      item.icon = 'restaurant_menu'
      items.push(item)
    })
    food.notSoHealthy.forEach(item => {
      item.type = 'You ate something casual'
      item.icon = 'fastfood'
      items.push(item)
    })
    ExerciseHelper.getStatistics().forEach(item => {
      item.type = 'You did an exercise'
      item.icon = 'directions_run'
      items.push(item)
    })
    items = items.sort((a, b) => { return b.time - a.time })

    var array = []
    var currentDate = ""
    var currentObject = {}
    var date = null
    var dateString = ""
    items.forEach(item => {
      date = new Date(item.time)
      dateString = date.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      if (currentDate != dateString) {
        currentDate = dateString
        currentObject = new Object()
        currentObject.title = dateString
        currentObject.items = new Array()
        array.push(currentObject)
      }
      item.details = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      currentObject.items.push(item)
    })
    console.log(array)
    this.items = array
  }
}
