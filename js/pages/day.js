/*global Vue*/

import Page from '../components/page.js'
import ProgressSections from '../components/progress-sections.js'
import ModalInput from '../components/modal-input.js'

import { MaxProgress, DayHelper } from '../helpers/progress.js'

export default {
  name: 'day',
  data() {
    return {
      helper: {},
      readableDate: ''
    }
  },
  computed: {
    title() {
      return this.readableDate == 'today' ? 'Today\'s Progress' : 'Progress of ' + this.readableDate
    },
    MaxProgress: () => MaxProgress
  },
  template:
    `<page :title="title" parent="/progress">
      <div class="card mb-16 p-16">
        <h2>General Progress <span class="material-icons-round c-icon">table_view</span></h2>
        <progress-sections
          :s1="helper.getWellBeingProgress()"
          :s2="helper.getWaterProgress()"
          :s3="helper.getFoodProgress()"
          :s4="helper.getExerciseProgress()">
        </progress-sections>
        <p>This is your general progress for {{ readableDate }}. It combines your progress in the sections below.</p>
      </div>
      <div class="card mb-16 p-16">
        <h2>Well-Being <span class="material-icons-round c-icon">hotel</span></h2>
        <h3>Sleep <span class="p">{{ helper.progress.sleep }}/{{ MaxProgress.sleep }} hours</span></h3>
        <div class="flex my-24 deep-purple">
          <button class="progress-control left" type="button" v-on:click="removeOne('sleep')">&minus;</button>
          <progress :max="MaxProgress.sleep" :value="helper.progress.sleep"></progress>
          <button class="progress-control right" type="button" v-on:click="addOne('sleep')">+</button>
        </div>
        <p>
          Getting enough quality sleep at the right times can improve your mental and physical health.
        </p>
        <h3>Meditation <span class="p">{{ helper.progress.meditation }}/{{ MaxProgress.meditation }}</span></h3>
        <div class="flex my-24 deep-purple">
          <button class="progress-control left" type="button" v-on:click="removeOne('meditation')">&minus;</button>
          <progress :max="MaxProgress.meditation" :value="helper.progress.meditation"></progress>
          <button class="progress-control right" type="button" v-on:click="addOne('meditation')">+</button>
        </div>
        <p>
          Meditation can help you get into a deeper state of relaxation and awareness.
        </p>
      </div>
      <div class="card mb-16 p-16">
        <h2>Nutrition <span class="material-icons-round c-icon">restaurant_menu</span></h2>
        <h3>Water <span class="p">{{ helper.progress.water }}/{{ MaxProgress.water }} cups</span></h3>
        <div class="flex my-24 indigo">
          <button class="progress-control left" type="button" v-on:click="removeOne('water')">&minus;</button>
          <progress :max="MaxProgress.water" :value="helper.progress.water"></progress>
          <button class="progress-control right" type="button" v-on:click="addOne('water')">+</button>
        </div>
        <p>
          It's healthy to drink about 3.7 litres per day. Thats about 15 and a half cups of water.
        </p>
        <h3>Calories <span class="p">{{ helper.progress.calories }}/{{ MaxProgress.calories }} kcal</span></h3>
        <div class="flex my-24 green">
          <button class="progress-control left" type="button" v-on:click="removeAmount('calories')">&minus;</button>
          <progress :max="MaxProgress.calories" :value="helper.progress.calories"></progress>
          <button class="progress-control right" type="button" v-on:click="addAmount('calories')">+</button>
        </div>
        <p>
          Calories tell you about the general energy in your food.
        </p>
        <h3>Fat <span class="p">{{ helper.progress.fat }}/{{ MaxProgress.fat }} g</span></h3>
        <div class="flex my-24 green">
          <button class="progress-control left" type="button" v-on:click="removeAmount('fat')">&minus;</button>
          <progress :max="MaxProgress.fat" :value="helper.progress.fat"></progress>
          <button class="progress-control right" type="button" v-on:click="addAmount('fat')">+</button>
        </div>
        <p>
          Your body needs fats to use vitamins and keep your skin healthy. They are the main energy storage of your body.
        </p>
        <h3>Carbs <span class="p">{{ helper.progress.carbs }}/{{ MaxProgress.carbs }} g</span></h3>
        <div class="flex my-24 green">
          <button class="progress-control left" type="button" v-on:click="removeAmount('carbs')">&minus;</button>
          <progress :max="MaxProgress.carbs" :value="helper.progress.carbs"></progress>
          <button class="progress-control right" type="button" v-on:click="addAmount('carbs')">+</button>
        </div>
        <p>
          Carbohydrates are the main source of energy for your body.
        </p>
        <h3>Protein <span class="p">{{ helper.progress.protein }}/{{ MaxProgress.protein }} g</span></h3>
        <div class="flex my-24 green">
          <button class="progress-control left" type="button" v-on:click="removeAmount('protein')">&minus;</button>
          <progress :max="MaxProgress.protein" :value="helper.progress.protein"></progress>
          <button class="progress-control right" type="button" v-on:click="addAmount('protein')">+</button>
        </div>
        <p>
          Protein is important for building muscle mass.
        </p>
      </div>
      <div class="card mb-16 p-16">
        <h2>Active Time <span class="material-icons-round c-icon">directions_run</span></h2>
        <h3>Exercises <span class="p">{{ helper.progress.exercises }}/{{ MaxProgress.exercises }}</span></h3>
        <div class="flex my-24 red">
          <button class="progress-control left" type="button" v-on:click="removeOne('exercises')">&minus;</button>
          <progress :max="MaxProgress.exercises" :value="helper.progress.exercises"></progress>
          <button class="progress-control right" type="button" v-on:click="addOne('exercises')">+</button>
        </div>
        <p>
          Exercises are great for testing and improving your abilites and performance.
        </p>
        <h3>Yoga <span class="p">{{ helper.progress.yoga }}/{{ MaxProgress.yoga }}</span></h3>
        <div class="flex my-24 red">
          <button class="progress-control left" type="button" v-on:click="removeOne('yoga')">&minus;</button>
          <progress :max="MaxProgress.yoga" :value="helper.progress.yoga"></progress>
          <button class="progress-control right" type="button" v-on:click="addOne('yoga')">+</button>
        </div>
        <p>
          Yoga can help you free your body from pains and problems.
        </p>
      </div>
    </page>`,
  components: {
    Page,
    ProgressSections
  },
  methods: {
    addOne(key) {
      if (this.helper.progress[key] < 50) this.helper.progress[key] += 1
      this.helper.saveProgress()
    },
    removeOne(key) {
      if (this.helper.progress[key] != 0) {
        this.helper.progress[key] -= 1
        this.helper.saveProgress()
      }
    },
    addAmount(key) {
      const ComponentClass = Vue.extend(ModalInput)
      const instance = new ComponentClass({
        propsData: {
          title: 'Add Amount',
          inputType: 'number',
          initialValue: '1',
          positiveText: 'Add',
          positiveFunction: () => {
            this.helper.progress[key] += parseInt(instance.$refs.input.value, 10)
            if (this.helper.progress[key] < 0) this.helper.progress[key] = 0
            if (this.helper.progress[key] > 10000) this.helper.progress[key] = 10000
            this.helper.saveProgress()
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    },
    removeAmount(key) {
      const ComponentClass = Vue.extend(ModalInput)
      const instance = new ComponentClass({
        propsData: {
          title: 'Remove Amount',
          inputType: 'number',
          initialValue: '1',
          positiveText: 'Remove',
          positiveFunction: () => {
            this.helper.progress[key] -= parseInt(instance.$refs.input.value, 10)
            if (this.helper.progress[key] < 0) this.helper.progress[key] = 0
            if (this.helper.progress[key] > 10000) this.helper.progress[key] = 10000
            this.helper.saveProgress()
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  },
  created() {
    const dateString = this.$route.query.date
    if (dateString == null) {
      this.helper = new DayHelper()
      this.readableDate = 'today'
    } else {
      this.helper = new DayHelper(dateString)
      this.readableDate = dateString.substring(6, 8) + '/' + dateString.substring(4, 6) + '/' + dateString.substring(0, 4)
    }
    this.total = this.helper.getProgress() * 100
  }
}
