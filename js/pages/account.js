import PageTabBar from '../components/page-tab-bar.js'

export default {
  name: 'account',
  template:
  '<page-tab-bar>\
    <h2>Hello $name</h2>\
    <ul>\
      <li>Preferences</li>\
      <li>Help</li>\
      <li>About</li>\
    </ul>\
  </page-tab-bar>',
  components: {
      PageTabBar
  }
}
