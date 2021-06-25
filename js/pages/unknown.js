import Page from '../components/page.js'

export default {
  name: 'unknown',
  template:
  `<page title="Not Found" parent="/progress">
    <h2>Page Not Found</h2>
    <p>Unfortunately the site you requested does not exist!</p>
  </page>`,
  components: {
      Page
  }
}
