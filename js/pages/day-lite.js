/*global Vue*/

import Page from '../components/page.js'
import ModalInput from '../components/modal-input.js'

import { DayHelper } from '../helpers/progress.js'

//TODO: Reduce usage of duplicated functions

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
    }
  },
  template:
    `<page :title="title" parent="/progress">
      <div class="card mb-16 lite general">
        Get custom daily goals with the full version of Icarus
      </div>
      <div class="card p-16">
        <div class="grid-2">
          <h3>Sleep</h3>
          <div class="flex my-24 center deep-purple">
            <button class="progress-control left" type="button" v-on:click="removeOne('sleep')">&minus;</button>
            <div class="text-center w-100">{{ helper.progress.sleep }} hours</div>
            <button class="progress-control right" type="button" v-on:click="addOne('sleep')">+</button>
          </div>
        </div>
        <div class="grid-2">
          <h3>Meditation</h3>
          <div class="flex my-24 center deep-purple">
            <button class="progress-control left" type="button" v-on:click="removeOne('meditation')">&minus;</button>
            <div class="text-center w-100">{{ helper.progress.meditation }}</div>
            <button class="progress-control right" type="button" v-on:click="addOne('meditation')">+</button>
          </div>
        </div>
        <div class="grid-2">
          <h3>Water</h3>
          <div class="flex my-24 center indigo">
            <button class="progress-control left" type="button" v-on:click="removeOne('water')">&minus;</button>
            <div class="text-center w-100">{{ helper.progress.water }} cups</div>
            <button class="progress-control right" type="button" v-on:click="addOne('water')">+</button>
          </div>
        </div>
        <div class="grid-2">
          <h3>Calories</h3>
          <div class="flex my-24 center green">
            <button class="progress-control left" type="button" v-on:click="removeAmount('calories')">&minus;</button>
            <div class="text-center w-100">{{ helper.progress.calories }} kcal</div>
            <button class="progress-control right" type="button" v-on:click="addAmount('calories')">+</button>
          </div>
        </div>
        <div class="grid-2">
          <h3>Fat</h3>
          <div class="flex my-24 center green">
            <button class="progress-control left" type="button" v-on:click="removeAmount('fat')">&minus;</button>
            <div class="text-center w-100">{{ helper.progress.fat }} g</div>
            <button class="progress-control right" type="button" v-on:click="addAmount('fat')">+</button>
          </div>
        </div>
        <div class="grid-2">
          <h3>Carbs</h3>
          <div class="flex my-24 center green">
            <button class="progress-control left" type="button" v-on:click="removeAmount('carbs')">&minus;</button>
            <div class="text-center w-100">{{ helper.progress.carbs }} g</div>
            <button class="progress-control right" type="button" v-on:click="addAmount('carbs')">+</button>
          </div>
        </div>
        <div class="grid-2">
          <h3>Protein</h3>
          <div class="flex my-24 center green">
            <button class="progress-control left" type="button" v-on:click="removeAmount('protein')">&minus;</button>
            <div class="text-center w-100">{{ helper.progress.protein }} g</div>
            <button class="progress-control right" type="button" v-on:click="addAmount('protein')">+</button>
          </div>
        </div>
        <div class="grid-2">
          <h3>Exercises</h3>
          <div class="flex my-24 center red">
            <button class="progress-control left" type="button" v-on:click="removeOne('exercises')">&minus;</button>
            <div class="text-center w-100">{{ helper.progress.exercises }}</div>
            <button class="progress-control right" type="button" v-on:click="addOne('exercises')">+</button>
          </div>
        </div>
        <div class="grid-2">
          <h3>Yoga</h3>
          <div class="flex mt-24 center red">
            <button class="progress-control left" type="button" v-on:click="removeOne('yoga')">&minus;</button>
            <div class="text-center w-100">{{ helper.progress.yoga }}</div>
            <button class="progress-control right" type="button" v-on:click="addOne('yoga')">+</button>
          </div>
        </div>
      </div>
    </page>`,
  components: {
    Page
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
