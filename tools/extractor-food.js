import Page from '../js/components/page.js'
import Extractor from './extractor.js'
import ModuleRun from './extractor-food-mod.js'

export default {
  name: 'extractor-food',
  data() {
    return {
      title: 'Food Extractor'
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
