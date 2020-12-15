/*global Vue*/

import Page from '../components/page.js'
import ModalInput from '../components/modal-input.js'

import Identifiers from '../helpers/identifiers.js'
import ProgressHelper from '../helpers/progress.js'

export default {
  name: 'day',
  data() {
    return {
      dateId: '',
      readableDate: '',
      total: 0,
      water: '0',
      calories: '0',
      carbs: '0',
      proteins: '0',
      fat: '0',
      exercises: '0',
      sleep: '0'
    }
  },
  computed: {
    title() {
      if (this.readableDate == 'today')
        return 'Today\'s Progress'
      else
        return 'Progress of ' + this.readableDate
    },
    ProgressHelper: () => ProgressHelper
  },
  template:
    '<page :title="title" parent="/progress">\
      <div class="card mb-16-p-16">\
        <h2>General Progress <span class="material-icons-round c-icon">table_view</span></h2>\
        <progress max="100" :value="total"></progress>\
        <p>This is your general progress for {{ readableDate }}. It combines your progress in the sections below.</p>\
      </div>\
      <div class="card mb-16-p-16">\
        <h2>Nutrition <span class="material-icons-round c-icon">restaurant_menu</span></h2>\
        <h3>Water <span class="p">{{ water }}/{{ ProgressHelper.maxWater }}</span></h3>\
        <div class="flex my-24">\
          <button class="progress-control left" type="button" v-on:click="removeOne(\'_water\')">&minus;</button>\
          <progress :max="ProgressHelper.maxWater" :value="water"></progress>\
          <button class="progress-control right" type="button" v-on:click="addOne(\'_water\')">+</button>\
        </div>\
        <p>It\'s healthy to drink about 3.7 litres per day. Thats about 11 and a half cups of water.</p>\
        <h3>Calories <span class="p">{{ calories }}/{{ ProgressHelper.maxCalories }}</span></h3>\
        <div class="flex my-24 indigo">\
          <button class="progress-control left" type="button" v-on:click="removeAmount(\'_calories\')">&minus;</button>\
          <progress :max="ProgressHelper.maxCalories" :value="calories"></progress>\
          <button class="progress-control right" type="button" v-on:click="addAmount(\'_calories\')">+</button>\
        </div>\
        <p>The calorie is a unit of energy defined as the amount of heat needed to raise a quantity of water by one degree of temperature.</p>\
        <h3>Carbs <span class="p">{{ carbs }}/{{ ProgressHelper.maxCarbs }}</span></h3>\
        <div class="flex my-24 deep-purple">\
          <button class="progress-control left" type="button" v-on:click="removeAmount(\'_carbs\')">&minus;</button>\
          <progress :max="ProgressHelper.maxCarbs" :value="carbs"></progress>\
          <button class="progress-control right" type="button" v-on:click="addAmount(\'_carbs\')">+</button>\
        </div>\
        <p>A carbohydrate is a biomolecule consisting of carbon, hydrogen and oxygen atoms, usually with a hydrogen–oxygen atom ratio of 2:1 and thus with the empirical formula Cₘₙ</p>\
        <h3>Proteins <span class="p">{{ proteins }}/{{ ProgressHelper.maxProteins }}</span></h3>\
        <div class="flex my-24 purple">\
          <button class="progress-control left" type="button" v-on:click="removeAmount(\'_proteins\')">&minus;</button>\
          <progress :max="ProgressHelper.maxProteins" :value="proteins"></progress>\
          <button class="progress-control right" type="button" v-on:click="addAmount(\'_proteins\')">+</button>\
        </div>\
        <p>Another smart text.</p>\
        <h3>Fat <span class="p">{{ fat }}/{{ ProgressHelper.maxFat }}</span></h3>\
        <div class="flex my-24 pink">\
          <button class="progress-control left" type="button" v-on:click="removeAmount(\'_fat\')">&minus;</button>\
          <progress :max="ProgressHelper.maxFat" :value="fat"></progress>\
          <button class="progress-control right" type="button" v-on:click="addAmount(\'_fat\')">+</button>\
        </div>\
        <p>A small info text why this is important.</p>\
      </div>\
      <div class="card mb-16-p-16">\
        <h2>Workout Exercises <span class="material-icons-round c-icon">fitness_center</span></h2>\
        <div class="flex my-24 red">\
          <button class="progress-control left" type="button" v-on:click="removeOne(\'_exercises\')">&minus;</button>\
          <progress :max="ProgressHelper.maxExercises" :value="exercises"></progress>\
          <button class="progress-control right" type="button" v-on:click="addOne(\'_exercises\')">+</button>\
        </div>\
        <p>A workout a day keeps the doctor away.</p>\
      </div>\
      <div class="card mb-16-p-16">\
        <h2>Sleep <span class="material-icons-round c-icon">hotel</span></h2>\
        <div class="flex my-24 deep-orange">\
          <button class="progress-control left" type="button" v-on:click="removeOne(\'_sleep\')">&minus;</button>\
          <progress :max="ProgressHelper.maxSleep" :value="sleep"></progress>\
          <button class="progress-control right" type="button" v-on:click="addOne(\'_sleep\')">+</button>\
        </div>\
        <p>A small info text why this is important.</p>\
      </div>\
    </page>',
  components: {
    Page
  },
  methods: {
    updateProgress() {
      this.water = localStorage.getItem(this.dateId + '_water') || 0
      this.calories = localStorage.getItem(this.dateId + '_calories') || 0
      this.carbs = localStorage.getItem(this.dateId + '_carbs') || 0
      this.proteins = localStorage.getItem(this.dateId + '_proteins') || 0
      this.fat = localStorage.getItem(this.dateId + '_fat') || 0
      this.exercises = localStorage.getItem(this.dateId + '_exercises') || 0
      this.sleep = localStorage.getItem(this.dateId + '_sleep') || 0
      this.total = ProgressHelper.calculateDayProgress(this.dateId) * 100
    },
    addOne(storageKey) {
      localStorage.setItem(
        this.dateId + storageKey,
        (parseInt(localStorage.getItem(this.dateId + storageKey), 10) || 0) + 1
      )
      this.updateProgress()
    },
    removeOne(storageKey) {
      localStorage.setItem(
        this.dateId + storageKey,
        (parseInt(localStorage.getItem(this.dateId + storageKey), 10) || 0) - 1
      )
      this.updateProgress()
    },
    addAmount(storageKey) {
      var sKey = this.dateId + storageKey
      var ComponentClass = Vue.extend(ModalInput)
      var instance = new ComponentClass({
        propsData: {
          title: 'Add Amount',
          inputType: 'number',
          initialValue: '1',
          positiveText: 'Add',
          positiveFunction: () => {
            localStorage.setItem(
              sKey,
              (parseInt(localStorage.getItem(sKey), 10) || 0) + parseInt(instance.$refs.input.value, 10)
            )
            this.updateProgress()
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    },
    removeAmount(storageKey) {
      var sKey = this.dateId + storageKey
      var ComponentClass = Vue.extend(ModalInput)
      var instance = new ComponentClass({
        propsData: {
          title: 'Remove Amount',
          inputType: 'number',
          initialValue: '1',
          positiveText: 'Remove',
          positiveFunction: () => {
            localStorage.setItem(
              sKey,
              (parseInt(localStorage.getItem(sKey), 10) || 0) - parseInt(instance.$refs.input.value, 10)
            )
            this.updateProgress()
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  },
  mounted() {
    var dateString = this.$route.query.date
    if (dateString == null) {
      this.dateId = Identifiers.getDateId()
      this.readableDate = 'today'
    } else {
      this.dateId = dateString
      this.readableDate = dateString.substring(6, 8) + '/' + dateString.substring(4, 6) + '/' + dateString.substring(0, 4)
    }
    this.updateProgress()
  }
}
