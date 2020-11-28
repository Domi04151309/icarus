import PageTabBar from '../components/page-tab-bar.js'

export default {
  name: 'experience',
  template:
  '<page-tab-bar>\
    <div class="card mb-16-p-16 intro big text-center">\
      <h2>\
        <span class="material-icons-round big">restaurant_menu</span><br>\
        The healthy...\
      </h2>\
    </div>\
    <div class="card mb-16-p-16 intro big text-center indigo">\
      <h2>\
        <span class="material-icons-round big">fastfood</span><br>\
        ...and the not-so-healthy\
      </h2>\
    </div>\
  </page-tab-bar>',
  components: {
      PageTabBar
  }
}
