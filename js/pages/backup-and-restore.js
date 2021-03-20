/*global Vue*/

import Page from '../components/page.js'
import Modal from '../components/modal.js'

export default {
  name: 'backup-and-restore',
  data() {
    return {
      title: 'Backup And Restore'
    }
  },
  template:
  `<page :title="title" parent="/account">
    <ul class="link-list ignore-page-padding">
      <li v-on:click="backup()"><span><span class="material-icons-round">cloud_download</span>Backup</span></li>
      <li v-on:click="restore()"><span><span class="material-icons-round">cloud_upload</span>Restore</span></li>
    </ul>
    <a id="download" class="hidden"></a>
    <input id="file" type="file" accept=".json" class="hidden" />
  </page>`,
  components: {
      Page
  },
  methods: {
    backup() {
      var data = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(localStorage))
      var date = new Date();
      var element = document.getElementById('download')
      element.setAttribute('href', data)
      element.setAttribute('download', 'icarus-' + date.toISOString() + '.json')
      element.click()
    },
    restore() {
      var element = document.getElementById('file')
      element.onchange = e => {
        var file = e.target.files[0]
        if (file) {
          var reader = new FileReader()
          reader.readAsText(file, 'UTF-8')
          reader.onload = evt => {
            var ComponentClass = Vue.extend(Modal)
            var instance = new ComponentClass({
              propsData: {
                title: 'Restore Data',
                message: 'Are you sure you want to restore from this file? This will delete all your existing data and cannot be undone.',
                positiveText: 'Restore',
                positiveFunction: () => {
                  var data = JSON.parse(evt.target.result)
                  localStorage.clear()
                  Object.keys(data).forEach(key => { localStorage.setItem(key, data[key])})
                  location.reload()
                }
              }
            })
            instance.$mount()
            this.$root.$el.appendChild(instance.$el)
          }
          reader.onerror = () => {
            this.error()
          }
        } else {
          this.error()
        }
      }
      element.click()
    },
    error() {
      var ComponentClass = Vue.extend(Modal)
      var instance = new ComponentClass({
        propsData: {
          title: 'Something Went Wrong',
          message: 'Please try again'
        }
      })
      instance.$mount()
      this.$root.$el.appendChild(instance.$el)
    }
  }
}
