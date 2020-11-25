import Page from '../components/page.js'
import ModalAddAmount from '../components/modal-add-amount.js'
import ModalRemoveAmount from '../components/modal-remove-amount.js'

export default {
  name: 'today',
  data: function() {
    return {
      title: 'Today\'s Progress',
      dateId: '',
      maxWater: '12',
      maxCalories: '100',
      maxCarbs: '100',
      maxProteins: '100',
      maxFat: '100',
      maxExercises: '100',
      maxSleep: '100'
    }
  },
  template:
    '<page :title="title" parent="/progress">\
      <div class="card mb-16-p-16">\
        <h2>General Progress <span class="material-icons-round c-icon">table_view</span></h2>\
        <progress max="100" value="65"></progress>\
        <p>This is your general progress for today. It combines your progress of the sections below.</p>\
      </div>\
      <div class="card mb-16-p-16">\
        <h2>Nutrition <span class="material-icons-round c-icon">restaurant_menu</span></h2>\
        <h3>Water <span class="p" ref="water_span">0/0</span></h3>\
        <div class="flex my-24">\
          <button class="progress-control left" type="button" v-on:click="removeAmount(\'_water\')">&minus;</button>\
          <progress :max="maxWater" ref="water_progress"></progress>\
          <button class="progress-control right" type="button" v-on:click="addAmount(\'_water\')">+</button>\
        </div>\
        <p>It\'s healthy to drink about 3.7 litres per day. Thats about 11 and a half cups of water.</p>\
        <h3>Calories <span class="p" ref="calories_span">0/0</span></h3>\
        <div class="flex my-24 indigo">\
          <button class="progress-control left" type="button" v-on:click="removeAmount(\'_calories\')">&minus;</button>\
          <progress :max="maxCalories" ref="calories_progress"></progress>\
          <button class="progress-control right" type="button" v-on:click="addAmount(\'_calories\')">+</button>\
        </div>\
        <p>The calorie is a unit of energy defined as the amount of heat needed to raise a quantity of water by one degree of temperature.</p>\
        <h3>Carbs <span class="p" ref="carbs_span">0/0</span></h3>\
        <div class="flex my-24 deep-purple">\
          <button class="progress-control left" type="button" v-on:click="removeAmount(\'_carbs\')">&minus;</button>\
          <progress :max="maxCarbs" ref="carbs_progress"></progress>\
          <button class="progress-control right" type="button" v-on:click="addAmount(\'_carbs\')">+</button>\
        </div>\
        <p>A carbohydrate is a biomolecule consisting of carbon, hydrogen and oxygen atoms, usually with a hydrogen–oxygen atom ratio of 2:1 and thus with the empirical formula Cₘₙ</p>\
        <h3>Proteins <span class="p" ref="proteins_span">0/0</span></h3>\
        <div class="flex my-24 purple">\
          <button class="progress-control left" type="button" v-on:click="removeAmount(\'_proteins\')">&minus;</button>\
          <progress :max="maxProteins" ref="proteins_progress""></progress>\
          <button class="progress-control right" type="button" v-on:click="addAmount(\'_proteins\')">+</button>\
        </div>\
        <p>Another smart text.</p>\
        <h3>Fat <span class="p" ref="fat_span">0/0</span></h3>\
        <div class="flex my-24 pink">\
          <button class="progress-control left" type="button" v-on:click="removeAmount(\'_fat\')">&minus;</button>\
          <progress :max="maxFat" ref="fat_progress"></progress>\
          <button class="progress-control right" type="button" v-on:click="addAmount(\'_fat\')">+</button>\
        </div>\
        <p>A small info text why this is important.</p>\
      </div>\
      <div class="card mb-16-p-16">\
        <h2>Workout Exercises <span class="material-icons-round c-icon">fitness_center</span></h2>\
        <div class="flex my-24 red">\
          <button class="progress-control left" type="button" v-on:click="removeAmount(\'_exercises\')">&minus;</button>\
          <progress :max="maxExercises" ref="exercises_progress"></progress>\
          <button class="progress-control right" type="button" v-on:click="addAmount(\'_exercises\')">+</button>\
        </div>\
        <p>A workout a day keeps the doctor away.</p>\
      </div>\
      <div class="card mb-16-p-16">\
        <h2>Sleep <span class="material-icons-round c-icon">hotel</span></h2>\
        <div class="flex my-24 deep-orange">\
          <button class="progress-control left" type="button" v-on:click="removeAmount(\'_sleep\')">&minus;</button>\
          <progress :max="maxSleep" ref="sleep_progress"></progress>\
          <button class="progress-control right" type="button" v-on:click="addAmount(\'_sleep\')">+</button>\
        </div>\
        <p>A small info text why this is important.</p>\
      </div>\
    </page>',
  components: {
    Page
  },
  methods: {
    updateProgress() {
      var today = new Date()
      this.dateId = today.getFullYear() + String(today.getMonth() + 1).padStart(2, '0') + String(today.getDate()).padStart(2, '0')

      var waterValue = localStorage.getItem(this.dateId + '_water') | 0
      this.$refs.water_span.innerHTML = waterValue + '/' + this.maxWater
      this.$refs.water_progress.value = waterValue
      var caloriesValue = localStorage.getItem(this.dateId + '_calories') | 0
      this.$refs.calories_span.innerHTML = caloriesValue + '/' + this.maxCalories
      this.$refs.calories_progress.value = caloriesValue
      var carbsValue = localStorage.getItem(this.dateId + '_carbs') | 0
      this.$refs.carbs_span.innerHTML = carbsValue + '/' + this.maxCarbs
      this.$refs.carbs_progress.value = carbsValue
      var proteinsValue = localStorage.getItem(this.dateId + '_proteins') | 0
      this.$refs.proteins_span.innerHTML = proteinsValue + '/' + this.maxProteins
      this.$refs.proteins_progress.value = proteinsValue
      var fatValue = localStorage.getItem(this.dateId + '_fat') | 0
      this.$refs.fat_span.innerHTML = fatValue + '/' + this.maxFat
      this.$refs.fat_progress.value = fatValue
      var exercisesValue = localStorage.getItem(this.dateId + '_exercises') | 0
      this.$refs.exercises_progress.value = exercisesValue
      var sleepValue = localStorage.getItem(this.dateId + '_sleep') | 0
      this.$refs.sleep_progress.value = sleepValue
    },
    addAmount(storageKey) {
      var ComponentClass = Vue.extend(ModalAddAmount)
      var instance = new ComponentClass({
        propsData: {
          sKey: this.dateId + storageKey,
          context: this
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    },
    removeAmount(storageKey) {
      var ComponentClass = Vue.extend(ModalRemoveAmount)
      var instance = new ComponentClass({
        propsData: {
          sKey: this.dateId + storageKey,
          context: this
      }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  },
  mounted: function () {
    this.updateProgress()
  }
}
