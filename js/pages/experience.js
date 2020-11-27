import PageTabBar from '../components/page-tab-bar.js'

export default {
  name: 'experience',
  template:
  '<page-tab-bar>\
    <div class="card mb-16-p-16 intro text-center">\
      <h2>The healthy...</h2>\
    </div>\
    <div class="card mb-16-p-16 intro text-center indigo">\
      <h2>... and the not so healthy</h2>\
    </div>\
  </page-tab-bar>',
  components: {
      PageTabBar
  }
}
