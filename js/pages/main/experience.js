import PageTabBar from '../../components/page-tab-bar.js'

export default {
  name: 'experience',
  template:
  `<page-tab-bar>
    <router-link to="/experience/healthy" class="card mb-16-p-16 intro big text-center">
      <h2>
        <span class="material-icons-round big">restaurant_menu</span><br>
        The healthy...
      </h2>
    </router-link>
    <router-link to="/experience/not-so-healthy" class="card mb-16-p-16 intro big text-center indigo">
      <h2>
        <span class="material-icons-round big">fastfood</span><br>
        ...and the not-so-healthy
      </h2>
    </router-link>
  </page-tab-bar>`,
  components: {
      PageTabBar
  }
}
