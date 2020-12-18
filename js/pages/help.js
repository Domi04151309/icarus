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
    <div class="card mb-16-p-16 intro text-center">
      <h2>Coming soon...</h2>
    </div>
  </page>`,
  components: {
      Page
  }
}
