import Page from '../components/page.js'

//TODO: Add content

export default {
  name: 'help',
  data() {
    return {
      title: 'Help'
    }
  },
  template:
  `<page :title="title" parent="/account">
    <h2>Exercise Recommendations</h2>
    <p>Coming soon...</p>
    <h2>Food Recommendations</h2>
    <p>Coming soon...</p>
    <h2>Level System</h2>
    <p>Coming soon...</p>
    <h2>Progress Calculation</h2>
    <p>Coming soon...</p>
  </page>`,
  components: {
      Page
  }
}
