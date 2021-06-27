import Page from '../js/components/page.js'
import ModuleRun from './extractor-workouts-mod.js'

export default {
  name: 'extractor-workouts',
  data() {
    return {
      title: 'Workout Extractor'
    }
  },
  template:
  `<page :title="title" parent="/tools">
    <p>This tool converts CSV data to useful JSON data.</p>
    <samp id="result"></samp>
  </page>`,
  components: {
      Page
  },
  mounted() {
    ModuleRun()
  }
}
