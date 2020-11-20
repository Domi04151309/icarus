import PageTabBar from '../components/page-tab-bar.js'

export default {
  name: 'training',
  template:
  '<page-tab-bar>\
    <h2>Daily Goal</h2>\
    <h2>Weekly Goal</h2>\
    <h2>Monthly Goal</h2>\
  </page-tab-bar>',
  components: {
      PageTabBar
  }
}
