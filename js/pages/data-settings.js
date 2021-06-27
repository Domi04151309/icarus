/*global Vue*/

import Page from '../components/page.js'
import ModalInput from '../components/modal-input.js'
import ModalGender from '../components/modal-gender.js'

import JsonHelper from '../helpers/json.js'

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
      <li v-on:click="editInfo('Change Name', 'name', 'text')"><span><span class="material-icons-round">face</span>Change name</span></li>
      <li v-on:click="editInfo('Change Age', 'age', 'number')"><span><span class="material-icons-round">edit_calendar</span>Change age</span></li>
      <li v-on:click="changeGender()"><span><span class="material-icons-round">wc</span>Change gender</span></li>
      <li><router-link to="/account/data/nutrition"><span class="material-icons-round">restaurant_menu</span>Nutrition Plan</router-link></li>
      <li><router-link to="/account/data/workout"><span class="material-icons-round">directions_run</span>Workout Plan</router-link></li>
    </ul>
  </page>`,
  components: {
      Page
  },
  methods: {
    editInfo(modalTitle, storageKey, storageType) {
      const ComponentClass = Vue.extend(ModalInput)
      const instance = new ComponentClass({
        propsData: {
          title: modalTitle,
          inputType: storageType,
          initialValue: JsonHelper.get('info', () => { return {} })[storageKey],
          positiveFunction: () => {
            const stored = JsonHelper.get('info', () => { return {} })
            stored[storageKey] = instance.$refs.input.value
            JsonHelper.set('info', stored)
          }
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    },
    changeGender() {
      const ComponentClass = Vue.extend(ModalGender)
      const instance = new ComponentClass()
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  }
}
