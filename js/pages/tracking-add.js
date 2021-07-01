/*global Vue*/

import Page from '../components/page.js'
import Modal from '../components/modal.js'

import InfoHelper from '../helpers/info.js'

import Fragments from '../data/tracking.js'

export default {
  name: 'tracking-add',
  data() {
    return {
      fragments: Fragments,
      fragment: 'default',
      values: [],
      date: '',
      time: ''
    }
  },
  template:
  `<page :title="'Add ' + fragments[fragment].title" :parent="'/progress/tracking?i=' + fragment">
    <div v-for="(item, index) in fragments[fragment].values" :key="index">
      <label :for="'value' + index">{{ item }} ({{ fragments[fragment].unit }})</label>
      <input :id="'value' + index" v-model.number="values[index]" type="number" class="mb-16"></input>
    </div>
    <label for="date">Date</label>
    <input id="date" v-model="date" type="date" class="mb-16"></input>
    <label for="time">Time</label>
    <input id="time" v-model="time" type="time"></input>
    <div ref="fab" class="material-icons-round fab hidden" v-on:click="onFabClicked()">done</div>
  </page>`,
  components: {
      Page
  },
  methods: {
    onFabClicked() {
      if (InfoHelper.addEntry(this.fragment, new Date(this.date + 'T' + this.time).getTime(), this.values)) {
        this.$router.push('/progress/tracking?i=' + this.fragment)
      } else {
        const ComponentClass = Vue.extend(Modal)
        const instance = new ComponentClass({
          propsData: {
            title: 'Invalid Input',
            message: 'The values you have entered are invalid.',
            positiveText: 'Ok',
            negativeButton: false
          }
        })
        instance.$mount()
        this.$root.$el.appendChild(instance.$el)
      }
    }
  },
  created() {
    if (Object.prototype.hasOwnProperty.call(Fragments, this.$route.query.i))
      this.fragment = this.$route.query.i
    else
      this.$router.push('/progress')

    const date = new Date()
    this.date = `${date.getUTCFullYear()}-${String(date.getUTCMonth()).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`
    this.time = `${String(date.getUTCHours()).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')}`
  },
  mounted() {
    setTimeout(() => { this.$refs.fab?.classList?.remove('hidden') }, 500)
  }
}
