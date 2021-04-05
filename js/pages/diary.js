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
    <div class="card mb-16-p-16 intro text-center">
      <h2>Everything at a glance</h2>
    </div>
    <ul class="card link-list m-0">
      <li v-for="(item, index) in items" :key="index">
        <span>
          {{ item.type }}<br>
          <span class="p">{{ item.details }}</span>
        </span>
      </li>
    </ul>
  </page>`,
  components: {
      Page
  },
  created() {
    var food = FoodHelper.getFoodStatistics()
    food.healthy.forEach(item => {
      item.type = 'You ate something healthy'
      this.items.push(item)
    })
    food.notSoHealthy.forEach(item => {
      item.type = 'You ate something casual'
      this.items.push(item)
    })
    ExerciseHelper.getStatistics().forEach(item => {
      item.type = 'You did an exercise'
      this.items.push(item)
    })

    this.items.forEach(item => {
      var string = new Date(item.time).toUTCString()
      item.details = string.substr(0, string.lastIndexOf(':'))
    })
    this.items = this.items.sort((a, b) => { return b.time - a.time })
    console.log(this.items)
  }
}
