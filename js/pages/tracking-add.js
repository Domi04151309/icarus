import Page from '../components/page.js'

import JsonHelper from '../helpers/json.js'

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
      <input :id="'value' + index" v-model="values[index]" type="number" class="mb-16"></input>
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
      if (this.values.length != 0) {
        const stored = JsonHelper.get(this.fragment, () => [])
        const millis = new Date(this.date + 'T' + this.time).getTime()
        stored.unshift({
          time: millis,
          values: this.values
        })
        JsonHelper.set(this.fragment, stored)

        if (stored.sort((a, b) => b.time - a.time)[0].time == millis) {
          const info = JsonHelper.get('info', () => { return {} })
          info[this.fragment] = this.values.join('/')
          JsonHelper.set('info', info)
        }
      }
      this.$router.push('/progress/tracking?i=' + this.fragment)
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