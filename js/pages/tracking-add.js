import Page from '../components/page.js'

import JsonHelper from '../helpers/json.js'

import Fragments from '../data/tracking.js'

export default {
  name: 'tracking-add',
  data() {
    return {
      fragments: Fragments,
      fragment: 'default',
      value: 0,
      date: '',
      time: ''
    }
  },
  template:
  `<page :title="'Add ' + fragments[fragment].title" :parent="'/progress/tracking?i=' + fragment">
    <label for="value">Value ({{ fragments[fragment].unit }})</label>
    <input id="value" v-model="value" type="number" class="mb-16"></input>
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
      const stored = JsonHelper.get(this.fragment, () => [])
      stored.unshift({
        time: new Date(this.date + 'T' + this.time).getTime(),
        value: this.value
      })
      JsonHelper.set(this.fragment, stored)

      const info = JsonHelper.get('info', () => { return {} })
      info[this.fragment] = this.value
      JsonHelper.set('info', info)

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
    this.time = `${date.getUTCHours()}:${date.getUTCMinutes()}`
  },
  mounted() {
    setTimeout(() => { this.$refs.fab?.classList?.remove('hidden') }, 500)
  }
}
