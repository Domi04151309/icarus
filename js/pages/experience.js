import PageTabBar from '../components/page-tab-bar.js'

//TODO: Add dynamic suggestions

export default {
  name: 'experience',
  template:
  '<page-tab-bar>\
    <router-link to="/experience/healthy" class="card mb-16-p-16 intro big text-center">\
      <h2>\
        <span class="material-icons-round big">restaurant_menu</span><br>\
        The healthy...\
      </h2>\
    </router-link>\
    <router-link to="/experience/not-so-healthy" class="card mb-16-p-16 intro big text-center indigo">\
      <h2>\
        <span class="material-icons-round big">fastfood</span><br>\
        ...and the not-so-healthy\
      </h2>\
    </router-link>\
    <div class="card mb-16-p-16">\
      <h2>\
        <span class="material-icons-round big accent">restaurant_menu</span><br>\
        Our Suggestions\
      </h2>\
      <h3>Healthy Food</h3>\
      <p>\
        Because you have selected plan ??? we suggest ??? for you.\
        It fits well because ???.\
      </p>\
      <p>\
        This will give you ??? and prepares you well for the day.\
      </p>\
      <h3>Not-So-Healthy Food</h3>\
      <p>\
        Because you have selected plan ??? we suggest ??? for you.\
        It fits well because ???.\
      </p>\
      <p>\
        This will give you ??? and prepares you well for the day.\
      </p>\
    </div>\
  </page-tab-bar>',
  components: {
      PageTabBar
  }
}
