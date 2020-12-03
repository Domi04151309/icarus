import Page from '../components/page.js'

export default {
  name: 'data',
  data() {
    return {
      title: 'Your Data',
      storage: []
    }
  },
  template:
  '<page :title="title" parent="/account">\
    <ul class="link-list ignore-page-padding">\
      <li v-for="item in storage" :key="item.key">\
        <span>\
          {{ item.key }}<br>\
          <span class="p">{{ item.value }}</span>\
        </span>\
      </li>\
    </ul>\
  </page>',
  components: {
      Page
  },
  mounted: function () {
    var array = []
    var keys = Object.keys(localStorage)

    for (var i = 0; i < keys.length; i++) {
      array.push({'key': keys[i], 'value': localStorage.getItem(keys[i])})
    }
    array.sort((a,b) => (a.key > b.key) ? 1 : ((b.key > a.key) ? -1 : 0))
    this.storage = array
  }
}
