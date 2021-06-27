import Page from '../js/components/page.js'
import Extractor from './extractor.js'
import ModuleRun from './extractor-exercises-mod.js'

export default {
  name: 'extractor-exercises',
  data() {
    return {
      title: 'Exercise Extractor'
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
