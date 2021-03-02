import PageTabBar from '../../components/page-tab-bar.js'

export default {
  name: 'nutrition',
  template:
  `<page-tab-bar>
    <router-link to="/nutrition/healthy" class="card mb-16-p-16 intro big text-center">
      <h2>
        <span class="material-icons-round big">restaurant_menu</span><br>
        Healthy Food
      </h2>
    </router-link>
    <router-link to="/nutrition/casual" class="card mb-16-p-16 intro big text-center indigo">
      <h2>
        <span class="material-icons-round big">fastfood</span><br>
        Casual Food
      </h2>
    </router-link>
  </page-tab-bar>`,
  components: {
      PageTabBar
  }
}
