/*global Vue*/

import Page from '../components/page.js'
import ModalInput from '../components/modal-input.js'

import Identifiers from '../helpers/identifiers.js'
import { ProgressCompanion, DayHelper } from '../helpers/progress.js'

export default {
  name: 'day',
  data() {
    return {
      dayHelper: {},
      readableDate: '',
      total: 0
    }
  },
  computed: {
    title() {
      if (this.readableDate == 'today')
        return 'Today\'s Progress'
      else
        return 'Progress of ' + this.readableDate
    },
    ProgressCompanion: () => ProgressCompanion
  },
  template:
    `<page :title="title" parent="/progress">
      <div class="card mb-16-p-16">
        <h2>General Progress <span class="material-icons-round c-icon">table_view</span></h2>
        <progress max="100" :value="total"></progress>
        <p>This is your general progress for {{ readableDate }}. It combines your progress in the sections below.</p>
      </div>
      <div class="card mb-16-p-16">
        <h2>Nutrition <span class="material-icons-round c-icon">restaurant_menu</span></h2>
        <h3>Water <span class="p">{{ dayHelper.progress.water }}/{{ ProgressCompanion.maxWater }} cups</span></h3>
        <div class="flex my-24">
          <button class="progress-control left" type="button" v-on:click="removeOne('water')">&minus;</button>
          <progress :max="ProgressCompanion.maxWater" :value="dayHelper.progress.water"></progress>
          <button class="progress-control right" type="button" v-on:click="addOne('water')">+</button>
        </div>
        <p>
          It's healthy to drink about 3.7 litres per day. Thats about 11 and a half cups of water.
        </p>
        <h3>Calories <span class="p">{{ dayHelper.progress.calories }}/{{ ProgressCompanion.maxCalories }} kcal</span></h3>
        <div class="flex my-24 green">
          <button class="progress-control left" type="button" v-on:click="removeAmount('calories')">&minus;</button>
          <progress :max="ProgressCompanion.maxCalories" :value="dayHelper.progress.calories"></progress>
          <button class="progress-control right" type="button" v-on:click="addAmount('calories')">+</button>
        </div>
        <p>
          Calories tell you about the general energy in your food.
        </p>
        <h3>Fat <span class="p">{{ dayHelper.progress.fat }}/{{ ProgressCompanion.maxFat }} g</span></h3>
        <div class="flex my-24 green">
          <button class="progress-control left" type="button" v-on:click="removeAmount('fat')">&minus;</button>
          <progress :max="ProgressCompanion.maxFat" :value="dayHelper.progress.fat"></progress>
          <button class="progress-control right" type="button" v-on:click="addAmount('fat')">+</button>
        </div>
        <p>
          Your body needs fats to use vitamins and keep your skin healthy. They are the main energy storage of your body.
        </p>
        <h3>Carbs <span class="p">{{ dayHelper.progress.carbs }}/{{ ProgressCompanion.maxCarbs }} g</span></h3>
        <div class="flex my-24 green">
          <button class="progress-control left" type="button" v-on:click="removeAmount('carbs')">&minus;</button>
          <progress :max="ProgressCompanion.maxCarbs" :value="dayHelper.progress.carbs"></progress>
          <button class="progress-control right" type="button" v-on:click="addAmount('carbs')">+</button>
        </div>
        <p>
          Carbohydrates are the main source of energy for your body.
        </p>
        <h3>Proteins <span class="p">{{ dayHelper.progress.proteins }}/{{ ProgressCompanion.maxProteins }} g</span></h3>
        <div class="flex my-24 green">
          <button class="progress-control left" type="button" v-on:click="removeAmount('proteins')">&minus;</button>
          <progress :max="ProgressCompanion.maxProteins" :value="dayHelper.progress.proteins"></progress>
          <button class="progress-control right" type="button" v-on:click="addAmount('proteins')">+</button>
        </div>
        <p>
          Proteins are important for building muscle mass.
        </p>
      </div>
      <div class="card mb-16-p-16">
        <h2>Exercises <span class="material-icons-round c-icon">directions_run</span></h2>
        <div class="flex my-24 red">
          <button class="progress-control left" type="button" v-on:click="removeOne('exercises')">&minus;</button>
          <progress :max="ProgressCompanion.maxExercises" :value="dayHelper.progress.exercises"></progress>
          <button class="progress-control right" type="button" v-on:click="addOne('exercises')">+</button>
        </div>
        <p>
          Exercises are great for testing and improving your abilites and performance.
        </p>
      </div>
      <div class="card mb-16-p-16">
        <h2>Sleep <span class="material-icons-round c-icon">hotel</span></h2>
        <div class="flex my-24 light-blue">
          <button class="progress-control left" type="button" v-on:click="removeOne('sleep')">&minus;</button>
          <progress :max="ProgressCompanion.maxSleep" :value="dayHelper.progress.sleep"></progress>
          <button class="progress-control right" type="button" v-on:click="addOne('sleep')">+</button>
        </div>
        <p>
          Getting enough quality sleep at the right times can improve your mental and physical health.
        </p>
      </div>
    </page>`,
  components: {
    Page
  },
  methods: {
    updateProgress() {
      this.total = this.dayHelper.getProgress() * 100
      this.dayHelper.saveProgress()
    },
    addOne(key) {
      this.dayHelper.progress[key] += 1
      this.updateProgress()
    },
    removeOne(key) {
      if (this.dayHelper.progress[key] != 0) {
        this.dayHelper.progress[key] -= 1
        this.updateProgress()
      }
    },
    addAmount(key) {
      var ComponentClass = Vue.extend(ModalInput)
      var instance = new ComponentClass({
        propsData: {
          title: 'Add Amount',
          inputType: 'number',
          initialValue: '1',
          positiveText: 'Add',
          positiveFunction: () => {
            this.dayHelper.progress[key] += parseInt(instance.$refs.input.value, 10)
            if (this.dayHelper.progress[key] < 0) this.dayHelper.progress[key] = 0
            if (this.dayHelper.progress[key] > 1000000) this.dayHelper.progress[key] = 1000000
            this.updateProgress()
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    },
    removeAmount(key) {
      var ComponentClass = Vue.extend(ModalInput)
      var instance = new ComponentClass({
        propsData: {
          title: 'Remove Amount',
          inputType: 'number',
          initialValue: '1',
          positiveText: 'Remove',
          positiveFunction: () => {
            this.dayHelper.progress[key] -= parseInt(instance.$refs.input.value, 10)
            if (this.dayHelper.progress[key] < 0) this.dayHelper.progress[key] = 0
            if (this.dayHelper.progress[key] > 1000000) this.dayHelper.progress[key] = 1000000
            this.updateProgress()
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  },
  created() {
    var dateString = this.$route.query.date
    if (dateString == null) {
      this.dayHelper = new DayHelper(Identifiers.getDateId())
      this.readableDate = 'today'
    } else {
      this.dayHelper = new DayHelper(dateString)
      this.readableDate = dateString.substring(6, 8) + '/' + dateString.substring(4, 6) + '/' + dateString.substring(0, 4)
    }
    this.total = this.dayHelper.getProgress() * 100
  }
}
