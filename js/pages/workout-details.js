import Page from '../components/page-large-app-bar.js'

//TODO: Add layout

export default {
  name: 'workout-details',
  data() {
    return {
      title: 'Workout'
    }
  },
  template:
  `<page :title="title" parent="/exercises" class="exercises red">
    <div class="card p-16">
      <h2>Not Yet Implemented</h2>
      <p>This feature is not yet implemented in the current version.</p>
    </div>
  </page>`,
  components: {
      Page
  }
}
