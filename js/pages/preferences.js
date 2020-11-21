import Page from '../components/page.js'
import ModalEditData from '../components/modal-edit-data.js'
import ModalDeleteData from '../components/modal-delete-data.js'

export default {
  name: 'preferences',
  data: function() {
    return {
      title: "Preferences"
    }
  },
  template:
  '<page :title="title" parent="/account">\
    <ul class="link-list ignore-page-padding">\
      <li v-on:click="edit(\'Change Name\', \'info_name\', \'text\')"><span><span class="material-icons-round">edit</span>Change name</span></li>\
      <li v-on:click="edit(\'Change Age\', \'info_age\', \'number\')"><span><span class="material-icons-round">edit</span>Change age</span></li>\
      <li v-on:click="deleteData()"><span><span class="material-icons-round">delete</span>Delete data</span></li>\
    </ul>\
  </page>',
  components: {
      Page
  },
  methods: {
    edit(modalTitle, storageKey, storageType) {
      var ComponentClass = Vue.extend(ModalEditData)
      var instance = new ComponentClass({
        propsData: {
          title: modalTitle,
          sKey: storageKey,
          sType: storageType
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    },
    deleteData() {
      var ComponentClass = Vue.extend(ModalDeleteData)
      var instance = new ComponentClass()
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  }
}
