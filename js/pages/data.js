/*global Vue*/

import Page from '../components/page.js'
import Modal from '../components/modal.js'

export default {
  name: 'data',
  data() {
    return {
      title: 'Raw Data',
      storage: []
    }
  },
  template:
  `<page :title="title" parent="/account/data">
    <ul class="link-list ignore-page-padding">
      <li v-for="item in storage" :key="item.key">
        <span v-on:click="deleteEntry(item.key)">
          {{ item.key }}<br>
          <span class="p">{{ item.value }}</span>
        </span>
      </li>
    </ul>
  </page>`,
  components: {
      Page
  },
  methods: {
    deleteEntry(key) {
      const ComponentClass = Vue.extend(Modal)
      const instance = new ComponentClass({
        propsData: {
          title: 'Delete Entry',
          message: 'Are you sure you want to delete this entry? This cannot be undone.',
          positiveText: 'Delete',
          positiveFunction: () => {
            localStorage.removeItem(key)
            this.loadEntries()
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    },
    loadEntries() {
      const array = []
      const keys = Object.keys(localStorage)

      for (const key of keys) {
        array.push({'key': key, 'value': localStorage.getItem(key)})
      }
      array.sort((a, b) => (a.key > b.key) ? 1 : ((b.key > a.key) ? -1 : 0))
      this.storage = array
    }
  },
  created() {
    this.loadEntries()
  }
}
