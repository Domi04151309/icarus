/*global Vue*/

import Page from '../components/page.js'
import Modal from '../components/modal.js'
import ModalTheme from '../components/modal-theme.js'

export default {
  name: 'app-settings',
  data() {
    return {
      title: 'App Settings'
    }
  },
  template:
  `<page :title="title" parent="/account">
    <ul class="link-list ignore-page-padding">
      <li v-on:click="changeTheme()"><span><span class="material-icons-round">palette</span>Change theme</span></li>
      <li v-on:click="reset('healthy-food')"><span><span class="material-icons-round">restaurant_menu</span>Reset healthy food</span></li>
      <li v-on:click="reset('casual-food')"><span><span class="material-icons-round">fastfood</span>Reset casual food</span></li>
      <li v-on:click="clearCache()"><span><span class="material-icons-round">delete</span>Clear cache</span></li>
    </ul>
  </page>`,
  components: {
      Page
  },
  methods: {
    changeTheme() {
      var ComponentClass = Vue.extend(ModalTheme)
      var instance = new ComponentClass()
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    },
    reset(key) {
      var ComponentClass = Vue.extend(Modal)
      var instance = new ComponentClass({
        propsData: {
          title: 'Reset Item',
          message: 'Are you sure you want to reset this item? This cannot be undone.',
          positiveText: 'Reset',
          positiveFunction: () => {
            localStorage.removeItem(key)
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    },
    clearCache() {
      var ComponentClass = Vue.extend(Modal)
      var instance = new ComponentClass({
        propsData: {
          title: 'Clear Cache',
          message: 'Are you sure you want to clear your cache? This cannot be undone.',
          positiveText: 'Clear',
          positiveFunction: () => {
            caches.keys().then(names => {
              for (const name of names) caches.delete(name)
              location.reload()
            })
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  }
}
