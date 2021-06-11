/*global Vue*/

import Page from '../components/page.js'
import Modal from '../components/modal.js'
import { Chart } from '../libs/frappe-charts.min.esm.js'

import JsonHelper from '../helpers/json.js'

import Fragments from '../data/tracking.js'

//TODO: Properly scale x axis
//TODO: Filter by week, month, and year

export default {
  name: 'tracking',
  data() {
    return {
      fragments: Fragments,
      fragment: 'default',
      chart: {},
      items: []
    }
  },
  template:
  `<page :title="fragments[fragment].title" parent="/progress">
    <div id="chart" class="ignore-page-padding"></div>
    <ul class="link-list card tracking">
      <li v-for="(item, index) in items" :key="index">
        <span v-on:click="onDeleteClicked(index)">
          <small class="p">{{ new Date(item.time).toLocaleDateString([], { dateStyle: 'medium' }) }}</small><br>
          {{ item.values.join('/') }} {{ fragments[fragment].unit }}
        </span>
      </li>
    </ul>
    <div ref="fab" class="material-icons-round fab hidden" v-on:click="onFabClicked()">add</div>
  </page>`,
  components: {
      Page
  },
  methods: {
    onFabClicked() {
      this.$router.push('/progress/tracking/add?i=' + this.fragment)
    },
    onDeleteClicked(index) {
      const ComponentClass = Vue.extend(Modal)
      const instance = new ComponentClass({
        propsData: {
          title: 'Delete Item',
          message: 'Do you want to delete this item? This cannot be undone.',
          positiveText: 'Delete',
          positiveFunction: () => {
            this.items.splice(index, 1)
            JsonHelper.set(this.fragment, this.items)
            this.chart.removeDataPoint(index)
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  },
  created() {
    if (Object.prototype.hasOwnProperty.call(Fragments, this.$route.query.i))
      this.fragment = this.$route.query.i
    else
      this.$router.push('/progress')

    const items = JsonHelper.get(this.fragment, () => [])
    items.sort((a, b) => b.time - a.time)
    this.items = items
  },
  mounted() {
    setTimeout(() => { this.$refs.fab?.classList?.remove('hidden') }, 500)

    const data = {}
    if (this.items.length == 0) {
      data.labels = [0, 50]
      data.datasets = [{ values: [0, 0] }]
    } else {
      const reversedData = JSON.parse(JSON.stringify(this.items)).reverse()
      data.labels = reversedData.map(x => new Date(x.time).toLocaleDateString([], { dateStyle: 'short' }))
      data.datasets = []
      for(const i in this.fragments[this.fragment].values) {
        data.datasets.push({
          name: this.fragments[this.fragment].values[i],
          values: reversedData.map(x => x.values[i])
        })
      }
    }
    this.chart = new Chart("#chart", {
      data: data,
      type: 'line',
      lineOptions: {
        hideDots: 1,
        spline: 1
      },
      colors: ['#2979FF', '#00B0FF']
    })
  }
}
