import Page from '../js/components/page.js'
import Extractor from './extractor.js'
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
    <extractor></extractor>
  </page>`,
  components: {
      Page,
      Extractor
  },
  mounted() {
    ModuleRun()
  }
}
