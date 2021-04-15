/*global Vue*/

import Page from '../components/page.js'
import Modal from '../components/modal.js'
import ModalInput from '../components/modal-input.js'

export default {
  name: 'data-settings',
  data() {
    return {
      title: 'Data Settings'
    }
  },
  template:
  `<page :title="title" parent="/account">
    <ul class="link-list ignore-page-padding">
      <li v-on:click="edit('Change Name', 'info_name', 'text')"><span><span class="material-icons-round">edit</span>Change name</span></li>
      <li v-on:click="edit('Change Age', 'info_age', 'number')"><span><span class="material-icons-round">edit</span>Change age</span></li>
      <li><router-link to="/account/data/nutrition"><span class="material-icons-round">restaurant_menu</span>Nutrition Plan</router-link></li>
      <li><router-link to="/account/data/workout"><span class="material-icons-round">directions_run</span>Workout Plan</router-link></li>
      <li><router-link to="/account/data/raw"><span class="material-icons-round">storage</span>Raw Data</router-link></li>
      <li v-on:click="deleteData()"><span><span class="material-icons-round">delete</span>Delete data</span></li>
    </ul>
  </page>`,
  components: {
      Page
  },
  methods: {
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
    }
  }
}
