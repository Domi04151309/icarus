import Page from '../components/page.js'

export default {
  name: 'data',
  data: function() {
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
    var keys = Object.keys(localStorage)
    this.storage = []

    for (var i = 0; i < keys.length; i++) {
      this.storage.push({'key': keys[i], 'value': localStorage.getItem(keys[i])})
    }
  }
}
