import Page from '../components/page.js'

export default {
  name: 'about',
  data: function() {
    return {
      title: 'About',
      version: 'unknown'
    }
  },
  template:
  '<page :title="title" parent="/account" class="text-center">\
    <img src="./pwa/mipmap-hdpi/ic_launcher.png" alt="Icon">\
    <h2>Icarus</h2>\
    <p>{{ version }}</p>\
    <p>\
      A simple fitness web app.<br>\
      Copyright 2020 Domi04151309\
    </p>\
  </page>',
  components: {
      Page
  },
  methods: {
    async getVersion() {
      this.version = (await window.caches.keys())[0]
    }
  },
  mounted: function () {
    this.getVersion()
  }
}
