/*global Vue*/

import Page from '../components/page.js'
import Modal from '../components/modal.js'
import ModalInput from '../components/modal-input.js'
import ModalTheme from '../components/modal-theme.js'

export default {
  name: 'preferences',
  data() {
    return {
      title: 'Preferences'
    }
  },
  template:
  `<page :title="title" parent="/account">
    <ul class="link-list ignore-page-padding">
      <li v-on:click="changeTheme()"><span><span class="material-icons-round">palette</span>Change theme</span></li>
      <li v-on:click="edit('Change Name', 'info_name', 'text')"><span><span class="material-icons-round">edit</span>Change name</span></li>
      <li v-on:click="edit('Change Age', 'info_age', 'number')"><span><span class="material-icons-round">edit</span>Change age</span></li>
      <li v-on:click="deleteData()"><span><span class="material-icons-round">delete</span>Delete data</span></li>
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
    edit(modalTitle, storageKey, storageType) {
      var ComponentClass = Vue.extend(ModalInput)
      var instance = new ComponentClass({
        propsData: {
          title: modalTitle,
          inputType: storageType,
          initialValue: localStorage.getItem(storageKey),
          positiveFunction: () => {
            localStorage.setItem(storageKey, instance.$refs.input.value)
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    },
    deleteData() {
      var ComponentClass = Vue.extend(Modal)
      var instance = new ComponentClass({
        propsData: {
          title: 'Delete Data',
          message: 'Are you sure you want to delete your data? This cannot be undone.',
          positiveText: 'Delete',
          positiveFunction: () => {
            localStorage.clear()
            location.reload()
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
