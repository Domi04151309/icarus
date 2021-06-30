import Page from '../js/components/page.js'

export default {
  name: 'tools',
  data() {
    return {
      title: 'Tools'
    }
  },
  template:
  `<page :title="title">
    <ul class="link-list ignore-page-padding">
      <li><router-link to="/tools/data"><span class="material-icons-round">storage</span>Raw Data</router-link></li>
      <li><router-link to="/tools/encryptor"><span class="material-icons-round">vpn_key</span>Encryptor</router-link></li>
      <li><router-link to="/tools/extractor-food"><span class="material-icons-round">restaurant_menu</span>Food Extractor</router-link></li>
      <li><router-link to="/tools/extractor-exercises"><span class="material-icons-round">directions_run</span>Exercise Extractor</router-link></li>
      <li><router-link to="/tools/extractor-workouts"><span class="material-icons-round">directions_run</span>Workout Extractor</router-link></li>
    </ul>
  </page>`,
  components: {
      Page
  }
}