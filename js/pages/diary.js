import Page from '../components/page.js'

//TODO: Add content

export default {
  name: 'diary',
  data() {
    return {
      title: 'Diary'
    }
  },
  template:
  `<page :title="title" parent="/progress">
    <div class="card mb-16-p-16 intro text-center">
      <h2>Coming soon...</h2>
    </div>
  </page>`,
  components: {
      Page
  }
}
