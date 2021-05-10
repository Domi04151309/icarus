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
      <li v-on:click="resetHelp()"><span><span class="material-icons-round">support</span>Reset tutorial dialogs</span></li>
      <li><router-link to="/account/app/log"><span class="material-icons-round">report</span>View error log</router-link></li>
      <li v-on:click="clearCache()"><span><span class="material-icons-round">delete</span>Clear cache</span></li>
    </ul>
  </page>`,
  components: {
      Page
  },
  methods: {
    changeTheme() {
      const ComponentClass = Vue.extend(ModalTheme)
      const instance = new ComponentClass()
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    },
    reset(key) {
      const ComponentClass = Vue.extend(Modal)
      const instance = new ComponentClass({
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
    resetHelp() {
      ['help_progress', 'help_exercises', 'help_nutrition'].forEach(key => {
        localStorage.removeItem(key)
      })
      const ComponentClass = Vue.extend(Modal)
      const instance = new ComponentClass({
        propsData: {
          title: 'Reset Tutorial Dialogs',
          message: 'The dialogs have been reset successfully.',
          negativeButton: false
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    },
    clearCache() {
      const ComponentClass = Vue.extend(Modal)
      const instance = new ComponentClass({
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
